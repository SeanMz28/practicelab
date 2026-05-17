"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Trophy, TrendingUp, Award } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function StatsCards() {
  const courses = useQuery(api.courses.list) ?? []
  const attempts = useQuery(api.attempts.listForCurrentUser) ?? []

  const graded = attempts.filter((a) => a.score !== null)
  const totalAssessments = attempts.length
  const averageScore =
    graded.length > 0 ? Math.round(graded.reduce((acc, a) => acc + (a.score ?? 0), 0) / graded.length) : 0

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Courses</p>
              <p className="text-3xl font-bold">{courses.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Assessments Completed</p>
              <p className="text-3xl font-bold">{totalAssessments}</p>
            </div>
            <div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-secondary-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Average Score</p>
              <p className="text-3xl font-bold">{averageScore > 0 ? `${averageScore}%` : "N/A"}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Perfect Scores</p>
              <p className="text-3xl font-bold">{graded.filter((a) => a.score === 100).length}</p>
            </div>
            <div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-secondary-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
