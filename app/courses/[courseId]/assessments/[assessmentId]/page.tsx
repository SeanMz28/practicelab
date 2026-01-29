import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AssessmentInterface } from "@/components/assessment/assessment-interface"
import { dummyAssessments, dummyCourses } from "@/lib/dummy-data"

interface AssessmentPageProps {
  params: Promise<{
    courseId: string
    assessmentId: string
  }>
}

export default async function AssessmentPage({ params }: AssessmentPageProps) {
  const { courseId, assessmentId } = await params
  const assessment = dummyAssessments.find((a) => a.id === assessmentId && a.courseId === courseId)
  const course = dummyCourses.find((c) => c.id === courseId)

  if (!assessment || !course) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <AssessmentInterface assessment={assessment} course={course} />
    </div>
  )
}
