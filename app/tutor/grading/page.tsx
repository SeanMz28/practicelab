"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, User } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export default function TutorGradingPage() {
  const pending = useQuery(api.attempts.listByStatus, { status: "pending" }) ?? []
  const assessments = useQuery(api.assessments.list) ?? []
  const courses = useQuery(api.courses.list) ?? []

  const studentIds = useMemo(() => pending.map((p) => p.userId), [pending])
  const students = useQuery(api.users.listByIds, { ids: studentIds }) ?? []
  const studentById = useMemo(() => new Map(students.map((s) => [s.id, s])), [students])

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Grading Queue</h1>
          <p className="text-muted-foreground">Review and grade student submissions</p>
        </div>

        {pending.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No submissions to grade</h3>
              <p className="text-muted-foreground">All assessment submissions have been graded</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {pending.map((attempt) => {
              const assessment = assessments.find((a) => a._id === attempt.assessmentId)
              const course = assessment ? courses.find((c) => c._id === assessment.courseId) : undefined
              const student = studentById.get(attempt.userId)
              return (
                <Card key={attempt._id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{assessment?.title ?? "Assessment"}</CardTitle>
                        <CardDescription>{course?.name ?? ""}</CardDescription>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{student?.name ?? "Loading..."}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Submitted {new Date(attempt.completedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>{attempt.totalQuestions} questions</span>
                        </div>
                      </div>
                      <Link href={`/tutor/grading/${attempt._id}`}>
                        <Button>Grade Submission</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
