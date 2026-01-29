"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, TrendingUp, Award, Clock, FileText, Download } from "lucide-react"
import type { Assessment, Course, AssessmentAttempt } from "@/lib/dummy-data"
import { dummyAssessments, dummyCourses } from "@/lib/dummy-data"

interface AssessmentResultsProps {
  courseId: string
  assessmentId: string
  attemptId?: string
}

export function AssessmentResults({ courseId, assessmentId, attemptId }: AssessmentResultsProps) {
  const [attempt, setAttempt] = useState<AssessmentAttempt | null>(null)
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    if (!attemptId) return

    const attempts = JSON.parse(localStorage.getItem("assessmentAttempts") || "[]")
    const found = attempts.find((a: AssessmentAttempt) => a.id === attemptId)

    if (found) {
      setAttempt(found)
      const assessmentData = dummyAssessments.find((a) => a.id === found.assessmentId)
      const courseData = dummyCourses.find((c) => c.id === courseId)
      setAssessment(assessmentData || null)
      setCourse(courseData || null)
    }
  }, [attemptId, courseId, assessmentId])

  if (!attempt || !assessment || !course) {
    return (
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Loading results...</p>
          </CardContent>
        </Card>
      </main>
    )
  }

  const totalPoints = assessment.questions.reduce((acc, q) => acc + q.points, 0)
  const earnedPoints = attempt.answers.reduce((acc, answer) => acc + (answer.pointsAwarded || 0), 0)
  const isPending = attempt.status === "pending"
  const score = attempt.score || Math.round((earnedPoints / totalPoints) * 100)
  const isPassing = score >= 70

  return (
    <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {isPending ? (
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-10 h-10 text-yellow-600" />
              </div>
            ) : isPassing ? (
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="w-10 h-10 text-primary" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-muted-foreground" />
              </div>
            )}
          </div>
          <CardTitle className="text-3xl mb-2">
            {isPending ? "Submission Received!" : isPassing ? "Congratulations!" : "Keep Practicing!"}
          </CardTitle>
          <CardDescription className="text-base">
            {isPending
              ? "Your assessment has been submitted and is pending review by your tutor"
              : `You scored ${score}% on ${assessment.title}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-primary">{isPending ? "Pending" : `${score}%`}</p>
              <p className="text-sm text-muted-foreground mt-1">Final Score</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold">
                {earnedPoints}/{totalPoints}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Points</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold">{isPending ? "Pending" : isPassing ? "Pass" : "Fail"}</p>
              <p className="text-sm text-muted-foreground mt-1">Status</p>
            </div>
          </div>

          {isPending && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Your submission contains questions that require manual grading. You'll receive
                your final score once your tutor has reviewed your work.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Link href={`/courses/${course.id}`} className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Back to Course
              </Button>
            </Link>
            <Link href={`/courses/${course.id}/assessments/${assessment.id}`} className="flex-1">
              <Button variant="secondary" className="w-full">
                Retake Assessment
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Review Your Answers</h2>

      <div className="space-y-6">
        {assessment.questions.map((question, qIndex) => {
          const answer = attempt.answers[qIndex]
          const isAutoGraded = question.type === "multiple-choice"
          const isCorrect = answer.isCorrect

          return (
            <Card
              key={question.id}
              className={isAutoGraded ? (isCorrect ? "border-green-500/50" : "border-red-500/50") : "border-border"}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {isAutoGraded ? (
                        isCorrect ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )
                      ) : (
                        <FileText className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        Question {qIndex + 1}: {question.question}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {question.type === "multiple-choice" && (
                          <Badge variant="outline" className="bg-blue-50">
                            Multiple Choice
                          </Badge>
                        )}
                        {question.type === "text" && (
                          <Badge variant="outline" className="bg-green-50">
                            Written Response
                          </Badge>
                        )}
                        {question.type === "file" && (
                          <Badge variant="outline" className="bg-yellow-50">
                            File Upload
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {answer.pointsAwarded !== undefined ? answer.pointsAwarded : 0} / {question.points}
                    </p>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Multiple Choice Display */}
                {question.type === "multiple-choice" && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => {
                      const isUserAnswer = answer.value === oIndex
                      const isCorrectAnswer = question.correctAnswer === oIndex

                      return (
                        <div
                          key={oIndex}
                          className={`p-3 rounded-lg border-2 ${
                            isCorrectAnswer
                              ? "border-green-500 bg-green-50"
                              : isUserAnswer
                                ? "border-red-500 bg-red-50"
                                : "border-border"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                            {isUserAnswer && !isCorrectAnswer && <XCircle className="w-4 h-4 text-red-600" />}
                            <span className={isCorrectAnswer ? "font-semibold" : ""}>{option}</span>
                            {isUserAnswer && <span className="ml-auto text-xs text-muted-foreground">Your answer</span>}
                            {isCorrectAnswer && (
                              <span className="ml-auto text-xs text-green-600 font-medium">Correct answer</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Text Answer Display */}
                {question.type === "text" && (
                  <div>
                    <h4 className="font-semibold mb-2">Your Answer:</h4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="whitespace-pre-wrap">{answer.value as string}</p>
                    </div>
                  </div>
                )}

                {/* File Upload Display */}
                {question.type === "file" && answer.value && (
                  <div>
                    <h4 className="font-semibold mb-2">Your Submission:</h4>
                    <div className="border-2 rounded-lg p-4 bg-muted/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-primary" />
                          <div>
                            <p className="font-medium">{(answer.value as any).fileName}</p>
                            <p className="text-sm text-muted-foreground">
                              {((answer.value as any).fileSize / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Explanation */}
                {question.explanation && question.type === "multiple-choice" && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Explanation:</p>
                    <p className="text-sm text-muted-foreground">{question.explanation}</p>
                  </div>
                )}

                {/* Tutor Feedback */}
                {answer.feedback && (
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1 text-blue-900">Tutor Feedback:</p>
                    <p className="text-sm text-blue-800">{answer.feedback}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {attempt.gradedAt && (
        <Card className="mt-6 bg-muted/30">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground text-center">
              Graded on {new Date(attempt.gradedAt).toLocaleDateString()} at{" "}
              {new Date(attempt.gradedAt).toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
