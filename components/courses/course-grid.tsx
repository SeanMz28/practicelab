"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function CourseGrid() {
  const courses = useQuery(api.courses.list)

  if (!courses) {
    return <p className="text-sm text-muted-foreground">Loading courses…</p>
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
              <span className="text-xs font-semibold px-2 py-1 bg-muted rounded">{course.code}</span>
            </div>
            <CardTitle className="text-lg">{course.name}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={`/courses/${course._id}`}>
              <Button className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                View Course
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
