"use client"

import { use } from "react"
import Link from "next/link"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Doc, Id } from "@/convex/_generated/dataModel"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MarkdownRenderer } from "@/components/notes/markdown-renderer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"
import { PasswordGate } from "@/components/access/password-gate"

interface NotePageProps {
  params: Promise<{
    courseId: string
    noteId: string
  }>
}

export default function NotePage({ params }: NotePageProps) {
  const { courseId, noteId } = use(params)
  const course = useQuery(api.courses.get, { id: courseId as Id<"courses"> })

  const isLoading = course === undefined
  const notFound = course === null

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {isLoading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : notFound ? (
          <p className="text-muted-foreground">Note not found.</p>
        ) : (
          <PasswordGate resourceType="course" resourceId={course._id} title={course.name}>
            <UnlockedNote noteId={noteId as Id<"notes">} course={course} />
          </PasswordGate>
        )}
      </main>
    </div>
  )
}

function UnlockedNote({ noteId, course }: { noteId: Id<"notes">; course: Doc<"courses"> }) {
  const note = useQuery(api.notes.get, { id: noteId })
  if (note === undefined) return <p className="text-muted-foreground">Loading note…</p>
  if (note === null) return <p className="text-muted-foreground">Note not found.</p>

  return (
    <>
      <Link href={`/courses/${course._id}`}>
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {course.code}
        </Button>
      </Link>
      <div className="bg-card rounded-lg border p-8">
        <div className="mb-6 pb-6 border-b">
          <h1 className="text-3xl font-bold mb-3">{note.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
            </div>
            <span className="px-2 py-1 bg-muted rounded text-xs font-medium">{course.code}</span>
          </div>
        </div>
        <MarkdownRenderer content={note.content} />
      </div>
    </>
  )
}
