import { BookOpen } from "lucide-react"
import type { Course } from "@/lib/dummy-data"

interface CourseHeaderProps {
  course: Course
}

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 ${course.color} rounded-lg flex items-center justify-center`}>
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-sm opacity-90 mb-1">{course.code}</p>
            <h1 className="text-3xl font-bold">{course.name}</h1>
          </div>
        </div>
        <p className="text-lg opacity-90 max-w-2xl">{course.description}</p>
      </div>
    </div>
  )
}
