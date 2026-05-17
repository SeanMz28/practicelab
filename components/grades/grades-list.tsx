"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Trophy, Calendar, Clock } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function GradesList() {
  const attempts = useQuery(api.attempts.listForCurrentUser) ?? []
  const assessments = useQuery(api.assessments.list) ?? []
  const courses = useQuery(api.courses.list) ?? []

  const sorted = [...attempts].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
  )

  const getScoreBadgeVariant = (score: number) => {
    if (score === 100) return "default"
    if (score >= 90) return "secondary"
    if (score >= 70) return "outline"
    return "destructive"
  }

  if (sorted.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Trophy className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">No assessment attempts yet</p>
          <p className="text-sm text-muted-foreground">Complete assessments to see your grades here</p>
          <Link href="/dashboard">
            <Button className="mt-4">Go to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {sorted.map((attempt) => {
        const assessment = assessments.find((a) => a._id === attempt.assessmentId)
        const course = assessment ? courses.find((c) => c._id === assessment.courseId) : undefined
        const isPending = attempt.status === "pending" || attempt.score === null
        const displayScore = isPending ? null : attempt.score

        return (
          <Card key={attempt._id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{assessment?.title ?? "Assessment"}</h3>
                      <p className="text-sm text-muted-foreground">{course?.name ?? ""}</p>
                    </div>
                    {isPending ? (
                      <Badge variant="secondary" className="ml-2 bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    ) : (
                      <Badge variant={getScoreBadgeVariant(displayScore!)} className="ml-2">
                        {displayScore}%
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(attempt.completedAt).toLocaleDateString()}</span>
                    </div>
                    <span>•</span>
                    {isPending ? (
                      <span>Awaiting tutor review</span>
                    ) : (
                      <span>
                        {Math.round(((displayScore ?? 0) / 100) * attempt.totalQuestions)}/{attempt.totalQuestions}{" "}
                        correct
                      </span>
                    )}
                  </div>
                </div>
                {course && assessment && (
                  <Link
                    href={`/courses/${course._id}/assessments/${assessment._id}/results?attemptId=${attempt._id}`}
                  >
                    <Button variant="outline" className="bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      View Results
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
