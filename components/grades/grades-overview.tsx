"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Award, Target, BarChart3 } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function GradesOverview() {
  const attempts = useQuery(api.attempts.listForCurrentUser) ?? []
  const graded = attempts.filter((a) => a.score !== null)

  const totalAssessments = attempts.length
  const averageScore =
    graded.length > 0 ? Math.round(graded.reduce((acc, a) => acc + (a.score ?? 0), 0) / graded.length) : 0
  const perfectScores = graded.filter((a) => a.score === 100).length
  const passingRate =
    graded.length > 0 ? Math.round((graded.filter((a) => (a.score ?? 0) >= 70).length / graded.length) * 100) : 0

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
