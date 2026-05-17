"use client"

import { useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, ClipboardList, FolderOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { NotesManager } from "@/components/tutor/notes-manager"
import { AssessmentsManager } from "@/components/tutor/assessments-manager"
import { ResourcesManager } from "@/components/tutor/resources-manager"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"

export default function ManageCoursePage() {
  const params = useParams()
  const courseId = params.courseId as Id<"courses">
  const course = useQuery(api.courses.get, { id: courseId })

  if (course === undefined) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 container mx-auto px-4 py-8">Loading...</main>
      </div>
    )
  }

  if (course === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 container mx-auto px-4 py-8">Course not found.</main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/tutor/courses">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
          <div className={`${course.color} text-white p-6 rounded-lg`}>
            <h1 className="text-3xl font-bold">{course.code}</h1>
            <p className="text-lg opacity-90 mt-1">{course.name}</p>
            <p className="text-sm opacity-75 mt-2">{course.description}</p>
          </div>
        </div>

        <Tabs defaultValue="notes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="notes">
              <FileText className="w-4 h-4 mr-2" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="assessments">
              <ClipboardList className="w-4 h-4 mr-2" />
              Assessments
            </TabsTrigger>
            <TabsTrigger value="resources">
              <FolderOpen className="w-4 h-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes">
            <NotesManager courseId={courseId} />
          </TabsContent>

          <TabsContent value="assessments">
            <AssessmentsManager courseId={courseId} />
          </TabsContent>

          <TabsContent value="resources">
            <ResourcesManager courseId={courseId} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
