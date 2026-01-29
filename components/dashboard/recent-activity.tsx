"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface AssessmentAttempt {
  id: string
  assessmentTitle: string
  courseName: string
  score: number
  completedAt: string
}

export function RecentActivity() {
  const [recentActivities, setRecentActivities] = useState<any[]>([])

  useEffect(() => {
    const storedAttempts = JSON.parse(localStorage.getItem("assessmentAttempts") || "[]")
    // Get the 3 most recent attempts
    const recent = storedAttempts
      .sort((a: any, b: any) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
      .slice(0, 3)
      .map((attempt: AssessmentAttempt) => ({
        id: attempt.id,
        type: "assessment",
        title: attempt.assessmentTitle,
        course: attempt.courseName,
        score: attempt.score,
        date: getRelativeTime(new Date(attempt.completedAt)),
      }))

    setRecentActivities(recent)
  }, [])

  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    return date.toLocaleDateString()
  }

  if (recentActivities.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>No recent activity</p>
          <p className="text-xs mt-1">Start taking assessments to see your activity here</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.course}
                  {activity.type === "assessment" && ` • Score: ${activity.score}%`}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
