import { notFound } from "next/navigation"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MarkdownRenderer } from "@/components/notes/markdown-renderer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"
import { dummyNotes, dummyCourses } from "@/lib/dummy-data"

interface NotePageProps {
  params: Promise<{
    courseId: string
    noteId: string
  }>
}

export default async function NotePage({ params }: NotePageProps) {
  const { courseId, noteId } = await params
  const note = dummyNotes.find((n) => n.id === noteId && n.courseId === courseId)
  const course = dummyCourses.find((c) => c.id === courseId)

  if (!note || !course) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Link href={`/courses/${courseId}`}>
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
      </main>
    </div>
  )
}
