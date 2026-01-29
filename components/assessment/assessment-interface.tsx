"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, ChevronRight, Check, Upload, FileText, X, Calendar } from "lucide-react"
import type { Assessment, Course } from "@/lib/dummy-data"

// Local interface for tracking answers during the assessment (allows null for unset file uploads)
interface LocalAnswer {
  questionId: string
  type: "multiple-choice" | "text" | "file"
  value: number | string | { fileName: string; fileSize: number } | null
  isCorrect?: boolean
  pointsAwarded?: number
  feedback?: string
}

interface AssessmentInterfaceProps {
  assessment: Assessment
  course: Course
}

export function AssessmentInterface({ assessment, course }: AssessmentInterfaceProps) {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<LocalAnswer[]>(
    assessment.questions.map((q) => ({
      questionId: q.id,
      type: q.type,
      value: q.type === "multiple-choice" ? -1 : q.type === "text" ? "" : null,
    })),
  )
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)

  const question = assessment.questions[currentQuestion]
  const currentAnswer = answers[currentQuestion]

  const handleMultipleChoiceChange = (questionIndex: number, value: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex].value = value
    setAnswers(newAnswers)
    updateAnsweredCount()
  }

  const handleTextChange = (questionIndex: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex].value = value
    setAnswers(newAnswers)
    updateAnsweredCount()
  }

  const handleRemoveFile = (questionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex].value = null
    setAnswers(newAnswers)
    updateAnsweredCount()
  }

  const handleFileUpload = (questionIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const newAnswers = [...answers]
      newAnswers[questionIndex].value = { fileName: file.name, fileSize: file.size }
      setAnswers(newAnswers)
      updateAnsweredCount()
    }
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

  const updateAnsweredCount = () => {
    const count = answers.filter((answer) => answer.value !== null && answer.value !== "").length
    setAnsweredCount(count)
    setProgress((count / assessment.questions.length) * 100)
  }

  useEffect(() => {
    if (started && !startTime) {
      const now = new Date().toISOString()
      setStartTime(now)

      if (assessment.type === "assignment") {
        // For assignments, calculate seconds until due date
        if (assessment.dueDate) {
          const dueTime = new Date(assessment.dueDate).getTime()
          const currentTime = new Date(now).getTime()
          const secondsLeft = Math.floor((dueTime - currentTime) / 1000)
          setTimeLeft(secondsLeft > 0 ? secondsLeft : 0)
        }
      } else if (assessment.timeLimit) {
        // For quiz/test, use minutes converted to seconds
        setTimeLeft(assessment.timeLimit * 60)
      }
    }
  }, [started, startTime, assessment.type, assessment.timeLimit, assessment.dueDate])

  useEffect(() => {
    if (started && timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev !== null && prev <= 1) {
            // Time's up - auto submit
            handleSubmit(true)
            return 0
          }
          return prev !== null ? prev - 1 : null
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [started, timeLeft])

  const handleSubmit = (autoSubmit = false) => {
    const gradedAnswers = answers.map((answer, index) => {
      const question = assessment.questions[index]
      if (question.type === "multiple-choice") {
        const isCorrect = answer.value === question.correctAnswer
        return {
          ...answer,
          isCorrect,
          pointsAwarded: isCorrect ? question.points : 0,
        }
      }
      return answer
    })

    const autoGradedScore = gradedAnswers.reduce((acc, answer) => {
      return acc + (answer.pointsAwarded || 0)
    }, 0)

    const totalPoints = assessment.questions.reduce((acc, q) => acc + q.points, 0)
    const hasManualGrading = assessment.questions.some((q) => q.type !== "multiple-choice")

    const attempt = {
      id: Date.now().toString(),
      assessmentId: assessment.id,
      userId: "user1",
      courseId: course.id,
      courseName: course.name,
      assessmentTitle: assessment.title,
      assessmentType: assessment.type,
      answers: gradedAnswers,
      score: hasManualGrading ? null : Math.round((autoGradedScore / totalPoints) * 100),
      totalQuestions: assessment.questions.length,
      startedAt: startTime || new Date().toISOString(),
      completedAt: new Date().toISOString(),
      status: hasManualGrading ? "pending" : "graded",
      autoSubmitted: autoSubmit,
    }

    const attempts = JSON.parse(localStorage.getItem("assessmentAttempts") || "[]")
    attempts.push(attempt)
    localStorage.setItem("assessmentAttempts", JSON.stringify(attempts))

    router.push(`/courses/${course.id}/assessments/${assessment.id}/results?attemptId=${attempt.id}`)
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
        <Link href={`/courses/${course.id}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {course.code}
          </Button>
        </Link>

        <Card>
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
          </div>
        </CardHeader>
        <CardContent>
          {question.type === "multiple-choice" && question.options && (
            <RadioGroup
              value={currentAnswer.value !== null && currentAnswer.value !== -1 ? currentAnswer.value.toString() : undefined}
              onValueChange={(value) => handleMultipleChoiceChange(currentQuestion, Number.parseInt(value))}
            >
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      currentAnswer.value === index
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleMultipleChoiceChange(currentQuestion, index)}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
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
            disabled={answeredCount < assessment.questions.length}
          >
            <Check className="w-4 h-4 mr-2" />
            Submit {assessment.type === "quiz" ? "Quiz" : assessment.type === "assignment" ? "Assignment" : "Test"}
          </Button>
        )}
      </div>
    </main>
  )
}
