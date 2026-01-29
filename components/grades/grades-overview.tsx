"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Award, Target, BarChart3 } from "lucide-react"

interface AssessmentAttempt {
  id: string
  assessmentId: string
  courseId: string
  courseName: string
  assessmentTitle: string
  score: number
  totalQuestions: number
  completedAt: string
}

export function GradesOverview() {
  const [attempts, setAttempts] = useState<AssessmentAttempt[]>([])

  useEffect(() => {
    const storedAttempts = JSON.parse(localStorage.getItem("assessmentAttempts") || "[]")
    setAttempts(storedAttempts)
  }, [])

  const totalAssessments = attempts.length
  const averageScore =
    attempts.length > 0 ? Math.round(attempts.reduce((acc, a) => acc + a.score, 0) / attempts.length) : 0
  const perfectScores = attempts.filter((a) => a.score === 100).length
  const passingRate =
    attempts.length > 0 ? Math.round((attempts.filter((a) => a.score >= 70).length / attempts.length) * 100) : 0

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAssessments}</div>
          <p className="text-xs text-muted-foreground mt-1">Completed</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageScore}%</div>
          <p className="text-xs text-muted-foreground mt-1">Across all assessments</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Perfect Scores</CardTitle>
          <Award className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{perfectScores}</div>
          <p className="text-xs text-muted-foreground mt-1">100% scores achieved</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Passing Rate</CardTitle>
          <Target className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{passingRate}%</div>
          <p className="text-xs text-muted-foreground mt-1">Above 70% threshold</p>
        </CardContent>
      </Card>
    </div>
  )
}
