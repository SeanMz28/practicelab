"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, ClipboardList, FolderOpen } from "lucide-react"
import type { Course, Note, Assessment } from "@/lib/dummy-data"

interface CourseContentProps {
  course: Course
}

export function CourseContent({ course }: CourseContentProps) {
  const [courseNotes, setCourseNotes] = useState<Note[]>([])
  const [courseAssessments, setCourseAssessments] = useState<Assessment[]>([])
  const [resourceCount, setResourceCount] = useState(0)

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]")
    setCourseNotes(notes.filter((note: Note) => note.courseId === course.id))

    const assessments = JSON.parse(localStorage.getItem("assessments") || "[]")
    setCourseAssessments(assessments.filter((assessment: Assessment) => assessment.courseId === course.id))

    const resources = JSON.parse(localStorage.getItem("resources") || "[]")
    setResourceCount(resources.filter((r: any) => r.courseId === course.id).length)
  }, [course.id])

  const getAssessmentTypeBadge = (type: string) => {
    const badges = {
      quiz: { label: "Quiz", color: "bg-blue-100 text-blue-700" },
      assignment: { label: "Assignment", color: "bg-green-100 text-green-700" },
      test: { label: "Test", color: "bg-purple-100 text-purple-700" },
    }
    return badges[type as keyof typeof badges] || badges.quiz
  }

  return (
    <Tabs defaultValue="notes" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="notes">Notes ({courseNotes.length})</TabsTrigger>
        <TabsTrigger value="assessments">Assessments ({courseAssessments.length})</TabsTrigger>
        <TabsTrigger value="resources">Resources ({resourceCount})</TabsTrigger>
      </TabsList>

      <TabsContent value="notes" className="space-y-4">
        {courseNotes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No notes available yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {courseNotes.map((note) => (
              <Card key={note.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    {note.title}
                  </CardTitle>
                  <CardDescription>Last updated: {new Date(note.updatedAt).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/courses/${course.id}/notes/${note.id}`}>
                    <Button>Read Note</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="assessments" className="space-y-4">
        {courseAssessments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ClipboardList className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No assessments available yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {courseAssessments.map((assessment) => {
              const badge = getAssessmentTypeBadge(assessment.type)
              return (
                <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2 mb-2">
                          <ClipboardList className="w-5 h-5 text-secondary-foreground" />
                          {assessment.title}
                        </CardTitle>
                        <CardDescription>{assessment.description}</CardDescription>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${badge.color}`}>{badge.label}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>{assessment.questions.length} questions</span>
                      {assessment.type === "assignment" && assessment.dueDate ? (
                        <span>Due: {new Date(assessment.dueDate).toLocaleDateString()}</span>
                      ) : assessment.timeLimit ? (
                        <span>
                          {assessment.type === "assignment"
                            ? `${assessment.timeLimit} days`
                            : `${assessment.timeLimit} minutes`}
                        </span>
                      ) : null}
                    </div>
                    <Link href={`/courses/${course.id}/assessments/${assessment.id}`}>
                      <Button variant="secondary">
                        Start {assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </TabsContent>

      <TabsContent value="resources" className="space-y-4">
        <Card>
          <CardContent className="py-8">
            <div className="flex items-center justify-center gap-3">
              <FolderOpen className="w-6 h-6 text-primary" />
              <p className="text-muted-foreground">
                {resourceCount > 0 ? `${resourceCount} resource(s) available` : "No resources available yet"}
              </p>
            </div>
            {resourceCount > 0 && (
              <div className="flex justify-center mt-4">
                <Link href={`/courses/${course.id}/resources`}>
                  <Button>View All Resources</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
