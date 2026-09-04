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
import { ArrowLeft, Clock, ChevronRight, Check, Upload, FileText, X, Calendar, CheckCircle2 } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Doc, Id } from "@/convex/_generated/dataModel"
import { QuizLeaderboard } from "@/components/assessment/quiz-leaderboard"

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

function shuffleIndices(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
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
  const [shuffledOrders] = useState<number[][]>(() =>
    assessment.questions.map((q) =>
      q.type === "multiple-choice" && q.options ? shuffleIndices(q.options.length) : [],
    ),
  )
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const [orderedDrafts, setOrderedDrafts] = useState<Record<string, string>>({})
  const [orderedErrors, setOrderedErrors] = useState<Record<string, string>>({})

  const question = assessment.questions[currentQuestion]
  const currentAnswer = answers[currentQuestion]

  const answeredCount = useMemo(
    () =>
      answers.filter((a) => {
        if (a.type === "multiple-choice") return typeof a.value === "number" && a.value !== -1
        if (a.type === "text" || a.type === "memory-verse") {
          return typeof a.value === "string" && a.value.trim() !== ""
        }
        if (a.type === "ordered-list") {
          const expectedCount =
            assessment.questions.find((question) => question.id === a.questionId)?.correctAnswers?.length ?? 0
          return Array.isArray(a.value) && expectedCount > 0 && a.value.length === expectedCount
        }
        if (a.type === "file") return a.value !== null
        return false
      }).length,
    [answers, assessment.questions],
  )
  const progress =
    assessment.questions.length === 0 ? 0 : (answeredCount / assessment.questions.length) * 100

  const handleMultipleChoiceChange = (questionIndex: number, value: number) => {
    setAnswers((prev) => prev.map((a, i) => (i === questionIndex ? { ...a, value } : a)))
  }

  const handleTextChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => prev.map((a, i) => (i === questionIndex ? { ...a, value } : a)))
  }

  const normalizeBookName = (value: string) =>
    value.normalize("NFKC").toLocaleLowerCase("en").replace(/\s+/g, " ").trim()

  const handleOrderedChange = (questionIndex: number, value: string) => {
    const targetQuestion = assessment.questions[questionIndex]
    const completed = Array.isArray(answers[questionIndex].value)
      ? (answers[questionIndex].value as string[])
      : []
    const expected = targetQuestion.correctAnswers?.[completed.length]

    setOrderedDrafts((prev) => ({ ...prev, [targetQuestion.id]: value }))
    setOrderedErrors((prev) => ({ ...prev, [targetQuestion.id]: "" }))

    if (expected && normalizeBookName(value) === normalizeBookName(expected)) {
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
        [targetQuestion.id]: "Check the spelling and make sure this is the next book in order.",
      }))
    }
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
                <li>Submit when you're ready to see your results</li>
              </ul>
            </div>

            <Button onClick={() => setStarted(true)} size="lg" className="w-full">
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

      <Progress value={progress} className="mb-6" />

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
              <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">In Order</span>
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
            const isComplete = completed.length === expected.length && expected.length > 0
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
                        <span className="text-sm font-medium">Enter this book below</span>
                      ) : (
                        <span className="text-sm">Waiting…</span>
                      )}
                    </div>
                  ))}
                </div>

                {isComplete ? (
                  <div className="flex items-center gap-2 rounded-md border border-green-300 bg-green-50 p-4 text-green-800">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">All {expected.length} books are correct and in order.</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor={`ordered-${question.id}`}>
                      Book {completed.length + 1} of {expected.length}
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
                      placeholder="Type the next book…"
                      autoComplete="off"
                      spellCheck={false}
                      autoFocus
                    />
                    <p className="text-xs text-muted-foreground">
                      A correct entry is confirmed automatically, then the field advances to the next book.
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

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {answeredCount} of {assessment.questions.length} questions answered
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </Button>

        <div className="flex-1" />

        {currentQuestion < assessment.questions.length - 1 ? (
          <Button onClick={handleNext}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={() => handleSubmit(false)}
            variant="secondary"
            disabled={answeredCount < assessment.questions.length || submitting}
          >
            <Check className="w-4 h-4 mr-2" />
            {submitting
              ? "Submitting..."
              : `Submit ${assessment.type === "quiz" ? "Quiz" : assessment.type === "assignment" ? "Assignment" : "Test"}`}
          </Button>
        )}
      </div>
    </main>
  )
}
