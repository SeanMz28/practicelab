"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, User } from "lucide-react"
import Link from "next/link"
import type { AssessmentAttempt } from "@/lib/dummy-data"

export default function TutorGradingPage() {
  const [attempts, setAttempts] = useState<AssessmentAttempt[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("assessmentAttempts") || "[]")
    const pending = stored.filter((a: AssessmentAttempt) => a.status === "pending")
    setAttempts(pending)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Grading Queue</h1>
          <p className="text-muted-foreground">Review and grade student submissions</p>
        </div>

        {attempts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No submissions to grade</h3>
              <p className="text-muted-foreground">All assessment submissions have been graded</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {attempts.map((attempt) => (
              <Card key={attempt.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{(attempt as any).assessmentTitle}</CardTitle>
                      <CardDescription>{(attempt as any).courseName}</CardDescription>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Student {attempt.userId}</span>
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
                    <Link href={`/tutor/grading/${attempt.id}`}>
                      <Button>Grade Submission</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
