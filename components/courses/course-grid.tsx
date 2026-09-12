"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, LockKeyhole } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { CourseGridLoading } from "@/components/loading/loading-states"
import { LockStatusBadge } from "@/components/access/lock-status-badge"

export function CourseGrid() {
  const courses = useQuery(api.courses.list)

  if (!courses) {
    return <CourseGridLoading />
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {courses.map((course) => (
        <Card key={course._id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center`}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <LockStatusBadge locked={course.locked} />
                <LockStatusBadge locked={!course.locked && course.passwordProtected} label="Password" />
                <span className="text-xs font-semibold px-2 py-1 bg-muted rounded">{course.code}</span>
              </div>
            </div>
            <CardTitle className="text-lg">{course.name}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {course.locked ? (
              <Button className="w-full" disabled>
                <LockKeyhole className="w-4 h-4 mr-2" />
                Course Locked
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link href={`/courses/${course._id}`}>
                <FileText className="w-4 h-4 mr-2" />
                View Course
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
