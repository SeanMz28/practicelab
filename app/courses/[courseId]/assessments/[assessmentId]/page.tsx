"use client"

import { use } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Doc, Id } from "@/convex/_generated/dataModel"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AssessmentInterface } from "@/components/assessment/assessment-interface"
import { PasswordGate } from "@/components/access/password-gate"

interface AssessmentPageProps {
  params: Promise<{
    courseId: string
    assessmentId: string
  }>
}

export default function AssessmentPage({ params }: AssessmentPageProps) {
  const { courseId, assessmentId } = use(params)
  const course = useQuery(api.courses.get, { id: courseId as Id<"courses"> })
  const assessmentMetadata = useQuery(api.assessments.getMetadata, {
    id: assessmentId as Id<"assessments">,
  })

  const isLoading = course === undefined || assessmentMetadata === undefined
  const notFound = course === null || assessmentMetadata === null

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
        <PasswordGate resourceType="course" resourceId={course._id} title={course.name}>
          <PasswordGate
            resourceType="assessment"
            resourceId={assessmentMetadata._id}
            title={assessmentMetadata.title}
          >
            <UnlockedAssessment
              assessmentId={assessmentMetadata._id}
              course={course}
            />
          </PasswordGate>
        </PasswordGate>
      )}
    </div>
  )
}

function UnlockedAssessment({
  assessmentId,
  course,
}: {
  assessmentId: Id<"assessments">
  course: Doc<"courses">
}) {
  const assessment = useQuery(api.assessments.get, { id: assessmentId })
  if (assessment === undefined) {
    return <div className="container mx-auto px-4 py-8 text-muted-foreground">Loading assessment…</div>
  }
  if (assessment === null) {
    return <div className="container mx-auto px-4 py-8 text-muted-foreground">Assessment not available.</div>
  }
  return <AssessmentInterface assessment={assessment} course={course} />
}
