import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AssessmentResults } from "@/components/assessment/assessment-results"

interface AssessmentResultsPageProps {
  params: Promise<{
    courseId: string
    assessmentId: string
  }>
  searchParams: Promise<{
    attemptId?: string
  }>
}

export default async function AssessmentResultsPage({ params, searchParams }: AssessmentResultsPageProps) {
  const { courseId, assessmentId } = await params
  const { attemptId } = await searchParams

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <AssessmentResults courseId={courseId} assessmentId={assessmentId} attemptId={attemptId} />
    </div>
  )
}
