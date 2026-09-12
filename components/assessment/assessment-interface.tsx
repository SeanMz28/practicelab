"use client"

import type React from "react"

import { useMemo, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Clock,
  ChevronRight,
  Check,
  Upload,
  FileText,
  X,
  Calendar,
  CheckCircle2,
  TriangleAlert,
} from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Doc, Id } from "@/convex/_generated/dataModel"
import { QuizLeaderboard } from "@/components/assessment/quiz-leaderboard"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface LocalFileAnswer {
  file: File
  fileName: string
  fileSize: number
  fileType: string
}

interface LocalAnswer {
  questionId: string
  type: "multiple-choice" | "text" | "file" | "ordered-list" | "memory-verse"
  value: number | string | string[] | LocalFileAnswer | null
  isCorrect?: boolean
  pointsAwarded?: number
  feedback?: string
}

interface AssessmentInterfaceProps {
  assessment: Doc<"assessments">
  course: Doc<"courses">
}

type AssessmentQuestion = Doc<"assessments">["questions"][number]

const PAIRED_ANSWER_SEPARATOR = "\t"

function splitPairedAnswer(value: string | undefined) {
  const [thing = "", scripture = ""] = (value ?? "").split(PAIRED_ANSWER_SEPARATOR)
  return { thing, scripture }
}

function isQuestionAnswered(answer: LocalAnswer, question: AssessmentQuestion) {
  if (answer.type === "multiple-choice") {
    return typeof answer.value === "number" && answer.value !== -1
  }
  if (answer.type === "text" || answer.type === "memory-verse") {
    return typeof answer.value === "string" && answer.value.trim() !== ""
  }
  if (answer.type === "ordered-list") {
    const expectedCount = question.correctAnswers?.length ?? 0
    if (question.answerLayout === "paired") {
      return (
        Array.isArray(answer.value) &&
        answer.value.length === expectedCount &&
        answer.value.every((value) => {
          const pair = splitPairedAnswer(value)
          return pair.thing.trim() !== "" && pair.scripture.trim() !== ""
        })
      )
    }
    return Array.isArray(answer.value) && expectedCount > 0 && answer.value.length === expectedCount
  }
  if (answer.type === "file") return answer.value !== null
  return false
}

function randomIndex(maxExclusive: number) {
  if (globalThis.crypto?.getRandomValues) {
    const value = new Uint32Array(1)
    globalThis.crypto.getRandomValues(value)
    return Math.floor((value[0] / 4_294_967_296) * maxExclusive)
  }
  return Math.floor(Math.random() * maxExclusive)
}

function shuffleIndices(n: number, previous?: number[]): number[] {
  const arr = Array.from({ length: n }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  const orderToAvoid = previous?.length === n ? previous : Array.from({ length: n }, (_, i) => i)
  if (n > 1 && arr.every((value, index) => value === orderToAvoid[index])) {
    ;[arr[0], arr[1]] = [arr[1], arr[0]]
  }
  return arr
}

export function AssessmentInterface({ assessment, course }: AssessmentInterfaceProps) {
  const router = useRouter()
  const submitAttempt = useMutation(api.attempts.submit)
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const [submitting, setSubmitting] = useState(false)
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<LocalAnswer[]>(
    assessment.questions.map((q) => ({
      questionId: q.id,
      type: q.type,
      value:
        q.type === "multiple-choice"
          ? -1
          : q.type === "ordered-list"
            ? []
            : q.type === "file"
              ? null
              : "",
    })),
  )
  const [shuffledOrders, setShuffledOrders] = useState<number[][]>(() =>
    assessment.questions.map((q) =>
      q.type === "multiple-choice" && q.options
        ? Array.from({ length: q.options.length }, (_, index) => index)
        : [],
    ),
  )
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const [orderedDrafts, setOrderedDrafts] = useState<Record<string, string>>({})
  const [orderedErrors, setOrderedErrors] = useState<Record<string, string>>({})
  const [submitWarningOpen, setSubmitWarningOpen] = useState(false)

  const question = assessment.questions[currentQuestion]
  const currentAnswer = answers[currentQuestion]

  const answeredQuestions = useMemo(
    () => answers.map((answer, index) => isQuestionAnswered(answer, assessment.questions[index])),
    [answers, assessment.questions],
  )
  const answeredCount = answeredQuestions.filter(Boolean).length
  const unansweredQuestionIndexes = useMemo(
    () => answeredQuestions.flatMap((isAnswered, index) => (isAnswered ? [] : [index])),
    [answeredQuestions],
  )
  const unansweredCount = unansweredQuestionIndexes.length
  const isCurrentQuestionAnswered = answeredQuestions[currentQuestion] ?? false
  const progress =
    assessment.questions.length === 0 ? 0 : (answeredCount / assessment.questions.length) * 100

  const handleMultipleChoiceChange = (questionIndex: number, value: number) => {
    setAnswers((prev) => prev.map((a, i) => (i === questionIndex ? { ...a, value } : a)))
  }

  const handleTextChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => prev.map((a, i) => (i === questionIndex ? { ...a, value } : a)))
  }

  const normalizeOrderedItem = (value: string) =>
    value.normalize("NFKC").toLocaleLowerCase("en").replace(/\s+/g, " ").trim()

  const handleOrderedChange = (questionIndex: number, value: string) => {
    const targetQuestion = assessment.questions[questionIndex]
    const completed = Array.isArray(answers[questionIndex].value)
      ? (answers[questionIndex].value as string[])
      : []
    const expected = targetQuestion.correctAnswers?.[completed.length]

    setOrderedDrafts((prev) => ({ ...prev, [targetQuestion.id]: value }))
    setOrderedErrors((prev) => ({ ...prev, [targetQuestion.id]: "" }))

    if (expected && normalizeOrderedItem(value) === normalizeOrderedItem(expected)) {
      setAnswers((prev) =>
        prev.map((answer, index) =>
          index === questionIndex ? { ...answer, value: [...completed, expected] } : answer,
        ),
      )
      setOrderedDrafts((prev) => ({ ...prev, [targetQuestion.id]: "" }))
    }
  }

  const handleOrderedEnter = (questionIndex: number) => {
    const targetQuestion = assessment.questions[questionIndex]
    const completed = Array.isArray(answers[questionIndex].value)
      ? (answers[questionIndex].value as string[])
      : []
    if (completed.length < (targetQuestion.correctAnswers?.length ?? 0)) {
      setOrderedErrors((prev) => ({
        ...prev,
        [targetQuestion.id]: "Check the spelling and make sure this is the next item in order.",
      }))
    }
  }

  const handlePairedAnswerChange = (
    questionIndex: number,
    pairIndex: number,
    field: "thing" | "scripture",
    value: string,
  ) => {
    const expectedCount = assessment.questions[questionIndex].correctAnswers?.length ?? 0
    const currentValues = Array.isArray(answers[questionIndex].value)
      ? (answers[questionIndex].value as string[])
      : []
    const nextValues = Array.from(
      { length: expectedCount },
      (_, index) => currentValues[index] ?? PAIRED_ANSWER_SEPARATOR,
    )
    const pair = splitPairedAnswer(nextValues[pairIndex])
    nextValues[pairIndex] =
      field === "thing"
        ? `${value}${PAIRED_ANSWER_SEPARATOR}${pair.scripture}`
        : `${pair.thing}${PAIRED_ANSWER_SEPARATOR}${value}`

    setAnswers((previous) =>
      previous.map((answer, index) =>
        index === questionIndex ? { ...answer, value: nextValues } : answer,
      ),
    )
  }

  const handleRemoveFile = (questionIndex: number) => {
    setAnswers((prev) => prev.map((a, i) => (i === questionIndex ? { ...a, value: null } : a)))
  }

  const handleFileUpload = (questionIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAnswers((prev) =>
      prev.map((a, i) =>
        i === questionIndex
          ? {
              ...a,
              value: { file, fileName: file.name, fileSize: file.size, fileType: file.type },
            }
          : a,
      ),
    )
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  useEffect(() => {
    if (started && !startTime) {
      const now = new Date().toISOString()
      setStartTime(now)

      if (assessment.type === "assignment") {
        if (assessment.dueDate) {
          const dueTime = new Date(assessment.dueDate).getTime()
          const currentTime = new Date(now).getTime()
          const secondsLeft = Math.floor((dueTime - currentTime) / 1000)
          setTimeLeft(secondsLeft > 0 ? secondsLeft : 0)
        }
      } else if (assessment.timeLimit) {
        setTimeLeft(assessment.timeLimit * 60)
      }
    }
  }, [started, startTime, assessment.type, assessment.timeLimit, assessment.dueDate])

  useEffect(() => {
    if (started && timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev !== null && prev <= 1) {
            handleSubmit(true)
            return 0
          }
          return prev !== null ? prev - 1 : null
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [started, timeLeft])

  const handleSubmit = async (_autoSubmit = false) => {
    if (submitting) return
    setSubmitting(true)
    try {
      const gradedAnswers = answers.map((answer, index) => {
        const q = assessment.questions[index]
        if (q.type === "multiple-choice") {
          const isCorrect = answer.value === q.correctAnswer
          return {
            ...answer,
            isCorrect,
            pointsAwarded: isCorrect ? q.points : 0,
          }
        }
        return answer
      })

      // Upload any file answers to Convex storage and replace with FileSubmission shape.
      const submittableAnswers = await Promise.all(
        gradedAnswers.map(async (a) => {
          if (a.type === "file" && a.value && typeof a.value === "object" && "file" in a.value) {
            const local = a.value as LocalFileAnswer
            const postUrl = await generateUploadUrl()
            const result = await fetch(postUrl, {
              method: "POST",
              headers: { "Content-Type": local.fileType || "application/octet-stream" },
              body: local.file,
            })
            if (!result.ok) throw new Error(`Upload failed for ${local.fileName}`)
            const { storageId } = (await result.json()) as { storageId: Id<"_storage"> }
            return {
              ...a,
              value: {
                fileName: local.fileName,
                fileType: local.fileType || "",
                fileSize: local.fileSize,
                storageId,
                uploadedAt: new Date().toISOString(),
              },
            }
          }
          if (a.value === null || a.value === -1) {
            return { ...a, value: a.type === "multiple-choice" ? -1 : "" }
          }
          return a
        }),
      )

      const attemptId = await submitAttempt({
        assessmentId: assessment._id,
        answers: submittableAnswers as any,
        startedAt: startTime || new Date().toISOString(),
      })

      router.push(`/courses/${course._id}/assessments/${assessment._id}/results?attemptId=${attemptId}`)
    } catch (err) {
      alert(`Submission failed: ${err instanceof Error ? err.message : "Unknown error"}`)
      setSubmitting(false)
    }
  }

  const handleSubmitRequest = () => {
    if (unansweredCount > 0) {
      setSubmitWarningOpen(true)
      return
    }
    void handleSubmit(false)
  }

  const reviewFirstUnansweredQuestion = () => {
    const firstUnanswered = unansweredQuestionIndexes[0]
    if (firstUnanswered !== undefined) setCurrentQuestion(firstUnanswered)
    setSubmitWarningOpen(false)
  }

  const formatTime = (seconds: number) => {
    if (assessment.type === "assignment") {
      const days = Math.floor(seconds / 86400)
      const hours = Math.floor((seconds % 86400) / 3600)
      const mins = Math.floor((seconds % 3600) / 60)

      if (days > 0) return `${days}d ${hours}h ${mins}m`
      if (hours > 0) return `${hours}h ${mins}m`
      return `${mins}m ${seconds % 60}s`
    }

    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getAssessmentTypeBadge = () => {
    const badges = {
      quiz: { label: "Quiz", color: "bg-blue-100 text-blue-700" },
      assignment: { label: "Assignment", color: "bg-green-100 text-green-700" },
      test: { label: "Test", color: "bg-purple-100 text-purple-700" },
    }
    const badge = badges[assessment.type]
    return <span className={`text-xs px-3 py-1 rounded-full font-medium ${badge.color}`}>{badge.label}</span>
  }

  const handleStartAssessment = () => {
    const storageKey = `assessment-option-order:${assessment._id}`
    let previousOrders: number[][] = []
    try {
      const savedOrders = window.sessionStorage.getItem(storageKey)
      if (savedOrders) {
        const parsedOrders: unknown = JSON.parse(savedOrders)
        if (Array.isArray(parsedOrders)) previousOrders = parsedOrders as number[][]
      }
    } catch {
      previousOrders = []
    }

    const nextOrders = assessment.questions.map((item, index) =>
      item.type === "multiple-choice" && item.options
        ? shuffleIndices(item.options.length, previousOrders[index])
        : [],
    )
    setShuffledOrders(nextOrders)
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(nextOrders))
    } catch {
      // Shuffling still works when browser storage is unavailable.
    }
    setStarted(true)
  }

  if (!started) {
    return (
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <Link href={`/courses/${course._id}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {course.code}
          </Button>
        </Link>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-2xl">{assessment.title}</CardTitle>
              {getAssessmentTypeBadge()}
            </div>
            <CardDescription>{assessment.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-muted-foreground">Questions</span>
                <span className="font-semibold">{assessment.questions.length}</span>
              </div>
              {assessment.type === "assignment" && assessment.dueDate ? (
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-muted-foreground">Due Date</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-semibold">{new Date(assessment.dueDate).toLocaleString()}</span>
                  </div>
                </div>
              ) : assessment.timeLimit ? (
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-muted-foreground">Time Limit</span>
                  <span className="font-semibold">
                    {assessment.type === "assignment"
                      ? `${assessment.timeLimit} days`
                      : `${assessment.timeLimit} minutes`}
                  </span>
                </div>
              ) : null}
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-muted-foreground">Passing Score</span>
                <span className="font-semibold">70%</span>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Instructions</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Read each question carefully</li>
                {assessment.type === "quiz" || assessment.type === "test" ? (
                  <>
                    <li>The timer will start when you begin</li>
                    <li>Your answers will auto-submit when time runs out</li>
                  </>
                ) : (
                  <li>Submit before the due date to avoid late penalty</li>
                )}
                <li>You can navigate between questions</li>
                <li>You can skip a question and return to it before submitting</li>
                <li>Submit when you're ready to see your results</li>
              </ul>
            </div>

            <Button onClick={handleStartAssessment} size="lg" className="w-full">
              Start {assessment.type === "quiz" ? "Quiz" : assessment.type === "assignment" ? "Assignment" : "Test"}
            </Button>
          </CardContent>
        </Card>
        {assessment.type === "quiz" && assessment.leaderboardEnabled && (
          <QuizLeaderboard assessmentId={assessment._id} />
        )}
      </main>
    )
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">{assessment.title}</h2>
            {getAssessmentTypeBadge()}
          </div>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {assessment.questions.length}
          </p>
        </div>
        {timeLeft !== null && (
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="w-5 h-5" />
            <span className={timeLeft < 300 && assessment.type !== "assignment" ? "text-destructive" : ""}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}
      </div>

      <Progress
        value={progress}
        className="mb-6"
        aria-label={`${answeredCount} of ${assessment.questions.length} questions answered`}
      />

      <nav className="mb-6 rounded-xl border bg-card p-4 shadow-sm" aria-labelledby="question-navigator-title">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 id="question-navigator-title" className="font-semibold">
              Question navigator
            </h3>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {answeredCount} answered · {unansweredCount} unanswered
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground" aria-hidden="true">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" /> Answered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border bg-background" /> Unanswered
            </span>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
          {assessment.questions.map((_, index) => {
            const isAnswered = answeredQuestions[index]
            const isCurrent = index === currentQuestion
            const status = isAnswered ? "answered" : "unanswered"
            return (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentQuestion(index)}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Question ${index + 1}, ${status}${isCurrent ? ", current question" : ""}`}
                className={cn(
                  "relative flex h-10 min-w-0 items-center justify-center rounded-md border text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isCurrent
                    ? "border-primary bg-primary text-primary-foreground"
                    : isAnswered
                      ? "border-green-300 bg-green-50 text-green-800 hover:bg-green-100"
                      : "bg-background hover:bg-muted",
                )}
              >
                {index + 1}
                {isAnswered && (
                  <Check
                    className={cn(
                      "absolute top-0.5 right-0.5 h-3 w-3",
                      isCurrent ? "text-primary-foreground" : "text-green-700",
                    )}
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>
      </nav>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-lg font-medium leading-relaxed">{question.question}</CardTitle>
            <span className="text-sm font-semibold text-muted-foreground shrink-0">{question.points} pts</span>
          </div>
          <div className="flex gap-2 mt-2">
            {question.type === "multiple-choice" && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Multiple Choice</span>
            )}
            {question.type === "text" && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Written Response</span>
            )}
            {question.type === "file" && (
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">File Upload</span>
            )}
            {question.type === "ordered-list" && (
              <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                {question.answerLayout === "paired" ? "3-Part Answer" : "In Order"}
              </span>
            )}
            {question.type === "memory-verse" && (
              <span className="text-xs px-2 py-1 bg-violet-100 text-violet-700 rounded-full">Memory Scripture</span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {question.type === "multiple-choice" && question.options && (
            <RadioGroup
              key={`q-${currentQuestion}`}
              value={
                typeof currentAnswer.value === "number" && currentAnswer.value !== -1
                  ? currentAnswer.value.toString()
                  : ""
              }
              onValueChange={(value) =>
                handleMultipleChoiceChange(currentQuestion, Number.parseInt(value))
              }
            >
              <div className="space-y-3">
                {(shuffledOrders[currentQuestion] ?? question.options.map((_, i) => i)).map(
                  (originalIndex) => {
                    const option = question.options![originalIndex]
                    const id = `q-${currentQuestion}-option-${originalIndex}`
                    return (
                      <div
                        key={originalIndex}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                          currentAnswer.value === originalIndex
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleMultipleChoiceChange(currentQuestion, originalIndex)}
                      >
                        <RadioGroupItem value={originalIndex.toString()} id={id} />
                        <Label htmlFor={id} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    )
                  },
                )}
              </div>
            </RadioGroup>
          )}

          {question.type === "text" && (
            <div className="space-y-2">
              <Textarea
                placeholder="Type your answer here..."
                value={currentAnswer.value as string}
                onChange={(e) => handleTextChange(currentQuestion, e.target.value)}
                className="min-h-[200px] text-base"
              />
              <p className="text-xs text-muted-foreground">{(currentAnswer.value as string).length} characters</p>
            </div>
          )}

          {question.type === "memory-verse" && (
            <div className="space-y-3">
              <Textarea
                placeholder="Type the scripture from memory…"
                value={currentAnswer.value as string}
                onChange={(e) => handleTextChange(currentQuestion, e.target.value)}
                className="min-h-[180px] text-base leading-relaxed"
                spellCheck={false}
              />
              <div className="rounded-md bg-muted/50 p-3 text-sm text-muted-foreground">
                Capital letters and punctuation do not affect your score. Spelling and word order must match exactly.
              </div>
            </div>
          )}

          {question.type === "ordered-list" && (() => {
            const expected = question.correctAnswers ?? []
            const completed = Array.isArray(currentAnswer.value) ? currentAnswer.value : []
            if (question.answerLayout === "paired") {
              return (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Enter the three matched pairs in any order. For each part, write the thing first,
                    followed by its supporting scripture.
                  </p>
                  {expected.map((_, index) => {
                    const pair = splitPairedAnswer(completed[index])
                    return (
                      <div key={index} className="rounded-lg border bg-muted/10 p-4">
                        <p className="mb-3 font-semibold">Part {index + 1}</p>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor={`paired-thing-${question.id}-${index}`}>Thing</Label>
                            <Input
                              id={`paired-thing-${question.id}-${index}`}
                              value={pair.thing}
                              onChange={(event) =>
                                handlePairedAnswerChange(currentQuestion, index, "thing", event.target.value)
                              }
                              placeholder="e.g. Pride"
                              autoComplete="off"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`paired-scripture-${question.id}-${index}`}>
                              Supporting scripture
                            </Label>
                            <Input
                              id={`paired-scripture-${question.id}-${index}`}
                              value={pair.scripture}
                              onChange={(event) =>
                                handlePairedAnswerChange(currentQuestion, index, "scripture", event.target.value)
                              }
                              placeholder="e.g. Proverbs 16:18"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            }
            const isComplete = completed.length === expected.length && expected.length > 0
            const inputHint = question.orderedListHint?.trim() || "Type the next item…"
            return (
              <div className="space-y-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  {expected.map((_, index) => (
                    <div
                      key={index}
                      className={`flex min-h-11 items-center gap-3 rounded-md border px-3 py-2 ${
                        index < completed.length
                          ? "border-green-300 bg-green-50 text-green-800"
                          : index === completed.length
                            ? "border-primary bg-primary/5"
                            : "bg-muted/20 text-muted-foreground"
                      }`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background text-xs font-semibold">
                        {index + 1}
                      </span>
                      {index < completed.length ? (
                        <>
                          <span className="font-medium">{completed[index]}</span>
                          <CheckCircle2 className="ml-auto h-4 w-4 text-green-600" />
                        </>
                      ) : index === completed.length ? (
                        <span className="text-sm font-medium">Enter this item below</span>
                      ) : (
                        <span className="text-sm">Waiting…</span>
                      )}
                    </div>
                  ))}
                </div>

                {isComplete ? (
                  <div className="flex items-center gap-2 rounded-md border border-green-300 bg-green-50 p-4 text-green-800">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">All {expected.length} items are correct and in order.</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor={`ordered-${question.id}`}>
                      Item {completed.length + 1} of {expected.length}
                    </Label>
                    <Input
                      key={`${question.id}-${completed.length}`}
                      id={`ordered-${question.id}`}
                      value={orderedDrafts[question.id] ?? ""}
                      onChange={(e) => handleOrderedChange(currentQuestion, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleOrderedEnter(currentQuestion)
                        }
                      }}
                      placeholder={inputHint}
                      autoComplete="off"
                      spellCheck={false}
                      autoFocus
                    />
                    <p className="text-xs text-muted-foreground">
                      A correct entry is confirmed automatically, then the field advances to the next item.
                    </p>
                    {orderedErrors[question.id] && (
                      <p className="text-sm text-destructive">{orderedErrors[question.id]}</p>
                    )}
                  </div>
                )}
              </div>
            )
          })()}

          {question.type === "file" && (
            <div className="space-y-4">
              {currentAnswer.value ? (
                <div className="border-2 border-dashed rounded-lg p-6 bg-muted/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium">{(currentAnswer.value as any).fileName}</p>
                        <p className="text-sm text-muted-foreground">
                          {((currentAnswer.value as any).fileSize / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFile(currentQuestion)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload your file
                    {question.acceptedFileTypes && ` (${question.acceptedFileTypes.join(", ")})`}
                  </p>
                  <Input
                    type="file"
                    accept={question.acceptedFileTypes?.join(",")}
                    onChange={(e) => handleFileUpload(currentQuestion, e)}
                    className="max-w-xs mx-auto"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mb-6 flex items-center justify-between">
        <p className={cn("text-sm", unansweredCount > 0 ? "text-amber-700" : "text-muted-foreground")}>
          {answeredCount} of {assessment.questions.length} questions answered
          {unansweredCount > 0 && ` · ${unansweredCount} still unanswered`}
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </Button>

        <div className="flex-1" />

        {currentQuestion < assessment.questions.length - 1 ? (
          <Button onClick={handleNext}>
            {isCurrentQuestionAnswered ? "Next" : "Skip for now"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmitRequest}
            variant="secondary"
            disabled={submitting}
          >
            <Check className="w-4 h-4 mr-2" />
            {submitting
              ? "Submitting..."
              : `Submit ${assessment.type === "quiz" ? "Quiz" : assessment.type === "assignment" ? "Assignment" : "Test"}`}
          </Button>
        )}
      </div>

      <Dialog open={submitWarningOpen} onOpenChange={setSubmitWarningOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TriangleAlert className="h-5 w-5 text-amber-600" />
              Unanswered questions
            </DialogTitle>
            <DialogDescription>
              You still have {unansweredCount} unanswered {unansweredCount === 1 ? "question" : "questions"}.
              Blank or incomplete responses will be submitted as they are and may receive no credit.
            </DialogDescription>
          </DialogHeader>

          <div>
            <p className="mb-2 text-sm font-medium">Go directly to an unanswered question:</p>
            <div className="flex max-h-36 flex-wrap gap-2 overflow-y-auto py-1">
              {unansweredQuestionIndexes.map((index) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={() => {
                    setCurrentQuestion(index)
                    setSubmitWarningOpen(false)
                  }}
                  aria-label={`Review unanswered question ${index + 1}`}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={reviewFirstUnansweredQuestion}>
              Review questions
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setSubmitWarningOpen(false)
                void handleSubmit(false)
              }}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit anyway"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
