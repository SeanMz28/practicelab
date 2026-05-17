"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Check, FileText, Download, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { useQuery, useMutation, useConvex } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { downloadFromUrl } from "@/lib/download-file"

interface GradingInterfaceProps {
  attemptId: string
}

export function GradingInterface({ attemptId }: GradingInterfaceProps) {
  const router = useRouter()
  const convex = useConvex()
  const attempt = useQuery(api.attempts.get, { id: attemptId as Id<"assessmentAttempts"> })
  const assessment = useQuery(
    api.assessments.get,
    attempt ? { id: attempt.assessmentId } : "skip",
  )
  const student = useQuery(api.users.getById, attempt ? { id: attempt.userId } : "skip")
  const grade = useMutation(api.attempts.grade)

  const handleDownloadFile = async (file: { storageId: Id<"_storage">; fileName: string }) => {
    const url = await convex.query(api.files.getUrl, { storageId: file.storageId })
    if (!url) {
      alert("File not available")
      return
    }
    try {
      await downloadFromUrl(url, file.fileName)
    } catch (err) {
      alert(`Download failed: ${err instanceof Error ? err.message : "Unknown error"}`)
    }
  }

  const [gradingData, setGradingData] = useState<
    { pointsAwarded: number; feedback: string }[]
  >([])

  useEffect(() => {
    if (attempt && assessment) {
      setGradingData(
        attempt.answers.map((answer, index) => ({
          pointsAwarded:
            answer.pointsAwarded ?? (answer.isCorrect ? assessment.questions[index].points : 0) ?? 0,
          feedback: answer.feedback || "",
        })),
      )
    }
  }, [attempt, assessment])

  const handlePointsChange = (index: number, points: number) => {
    const newData = [...gradingData]
    newData[index].pointsAwarded = points
    setGradingData(newData)
  }

  const handleFeedbackChange = (index: number, feedback: string) => {
    const newData = [...gradingData]
    newData[index].feedback = feedback
    setGradingData(newData)
  }

  const handleSubmitGrades = async () => {
    if (!attempt || !assessment) return

    const totalPoints = assessment.questions.reduce((acc, q) => acc + q.points, 0)
    const earnedPoints = gradingData.reduce((acc, d) => acc + d.pointsAwarded, 0)
    const finalScore = Math.round((earnedPoints / totalPoints) * 100)

    const updatedAnswers = attempt.answers.map((answer, index) => ({
      ...answer,
      pointsAwarded: gradingData[index].pointsAwarded,
      feedback: gradingData[index].feedback,
    }))

    await grade({
      id: attempt._id,
      answers: updatedAnswers,
      score: finalScore,
    })

    router.push("/tutor/grading")
  }

  if (!attempt || !assessment) {
    return (
      <main className="flex-1 container mx-auto px-4 py-8">
        <p>Loading...</p>
      </main>
    )
  }

  const totalPoints = assessment.questions.reduce((acc, q) => acc + q.points, 0)
  const currentPoints = gradingData.reduce((acc, d) => acc + d.pointsAwarded, 0)

  return (
    <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/tutor/grading">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Grading Queue
        </Button>
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{assessment.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            {student ? (
              <>
                {student.name}
                {student.email && (
                  <span className="text-muted-foreground/70"> ({student.email})</span>
                )}
              </>
            ) : (
              "Loading student..."
            )}
          </span>
          <span>•</span>
          <span>Submitted {new Date(attempt.completedAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>
            {currentPoints} / {totalPoints} points
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {assessment.questions.map((question, index) => {
          const answer = attempt.answers[index]
          const grading = gradingData[index] ?? { pointsAwarded: 0, feedback: "" }

          return (
            <Card key={question.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      Question {index + 1}: {question.question}
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
                      <span className="text-sm text-muted-foreground">{question.points} points</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Student Answer:</h4>
                  {question.type === "multiple-choice" && (
                    <div className="space-y-2">
                      {question.options?.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-lg border-2 ${
                            answer.value === optIndex
                              ? answer.isCorrect
                                ? "border-green-500 bg-green-50"
                                : "border-red-500 bg-red-50"
                              : optIndex === question.correctAnswer
                                ? "border-green-300 bg-green-50/50"
                                : "border-border"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {answer.value === optIndex && (
                              <>
                                {answer.isCorrect ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-600" />
                                )}
                              </>
                            )}
                            {optIndex === question.correctAnswer && answer.value !== optIndex && (
                              <span className="text-xs text-green-600 font-medium">Correct Answer</span>
                            )}
                          </div>
                        </div>
                      ))}
                      {question.explanation && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      )}
                    </div>
                  )}

                  {question.type === "text" && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="whitespace-pre-wrap">{answer.value as string}</p>
                    </div>
                  )}

                  {question.type === "file" && answer.value && typeof answer.value === "object" && (
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleDownloadFile(
                              answer.value as { storageId: Id<"_storage">; fileName: string },
                            )
                          }
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {question.type !== "multiple-choice" && (
                  <div className="border-t pt-4 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`points-${index}`}>Points Awarded (out of {question.points})</Label>
                      <Input
                        id={`points-${index}`}
                        type="number"
                        min={0}
                        max={question.points}
                        value={grading.pointsAwarded}
                        onChange={(e) => handlePointsChange(index, Number.parseInt(e.target.value) || 0)}
                        className="max-w-xs"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`feedback-${index}`}>Feedback (optional)</Label>
                      <Textarea
                        id={`feedback-${index}`}
                        placeholder="Provide feedback to the student..."
                        value={grading.feedback}
                        onChange={(e) => handleFeedbackChange(index, e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                )}

                {question.type === "multiple-choice" && answer.isCorrect !== undefined && (
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Auto-graded:</span>
                      <span className="font-semibold">
                        {grading.pointsAwarded} / {question.points} points
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="mt-6">
        <CardContent className="py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Total Score</h3>
              <p className="text-sm text-muted-foreground">
                {currentPoints} out of {totalPoints} points ({Math.round((currentPoints / totalPoints) * 100)}%)
              </p>
            </div>
            <Button onClick={handleSubmitGrades} size="lg">
              <Check className="w-4 h-4 mr-2" />
              Submit Grades
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
