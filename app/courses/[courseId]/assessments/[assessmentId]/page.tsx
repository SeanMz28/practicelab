"use client"

import { use } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AssessmentInterface } from "@/components/assessment/assessment-interface"

interface AssessmentPageProps {
  params: Promise<{
    courseId: string
    assessmentId: string
  }>
}

export default function AssessmentPage({ params }: AssessmentPageProps) {
  const { courseId, assessmentId } = use(params)
  const course = useQuery(api.courses.get, { id: courseId as Id<"courses"> })
  const assessment = useQuery(api.assessments.get, { id: assessmentId as Id<"assessments"> })

  const isLoading = course === undefined || assessment === undefined
  const notFound = course === null || assessment === null

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      {isLoading ? (
        <div className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Loading…</p>
        </div>
      ) : notFound ? (
        <div className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Assessment not found.</p>
        </div>
      ) : (
        <AssessmentInterface assessment={assessment} course={course} />
      )}
    </div>
  )
}
