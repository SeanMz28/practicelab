"use client"

import { use } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CourseHeader } from "@/components/courses/course-header"
import { CourseContent } from "@/components/courses/course-content"
import { PasswordGate } from "@/components/access/password-gate"

interface CoursePageProps {
  params: Promise<{
    courseId: string
  }>
}

export default function CoursePage({ params }: CoursePageProps) {
  const { courseId } = use(params)
  const course = useQuery(api.courses.get, { id: courseId as Id<"courses"> })

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1">
        {course === undefined ? (
          <div className="container mx-auto px-4 py-8">
            <p className="text-muted-foreground">Loading…</p>
          </div>
        ) : course === null ? (
          <div className="container mx-auto px-4 py-8">
            <p className="text-muted-foreground">Course not found.</p>
          </div>
        ) : (
          <PasswordGate resourceType="course" resourceId={course._id} title={course.name}>
            <CourseHeader course={course} />
            <div className="container mx-auto px-4 py-8">
              <CourseContent course={course} />
            </div>
          </PasswordGate>
        )}
      </main>
    </div>
  )
}
