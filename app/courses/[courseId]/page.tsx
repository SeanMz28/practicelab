import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CourseHeader } from "@/components/courses/course-header"
import { CourseContent } from "@/components/courses/course-content"
import { dummyCourses } from "@/lib/dummy-data"

interface CoursePageProps {
  params: Promise<{
    courseId: string
  }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params
  const course = dummyCourses.find((c) => c.id === courseId)

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <main className="flex-1">
        <CourseHeader course={course} />
        <div className="container mx-auto px-4 py-8">
          <CourseContent course={course} />
        </div>
      </main>
    </div>
  )
}
