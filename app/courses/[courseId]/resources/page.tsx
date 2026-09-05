"use client"

import { useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, File, ImageIcon, Code, FolderOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useQuery, useConvex } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Doc, Id } from "@/convex/_generated/dataModel"
import { downloadFromUrl } from "@/lib/download-file"
import { PasswordGate } from "@/components/access/password-gate"
import { ResourcePageLoading } from "@/components/loading/loading-states"

export default function CourseResourcesPage() {
  const params = useParams()
  const courseId = params.courseId as Id<"courses">
  const course = useQuery(api.courses.get, { id: courseId })

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        {course === undefined ? (
          <ResourcePageLoading />
        ) : course === null ? (
          <p className="text-muted-foreground">Course not found.</p>
        ) : (
          <PasswordGate resourceType="course" resourceId={course._id} title={course.name}>
            <UnlockedResources courseId={courseId} />
          </PasswordGate>
        )}
      </main>
    </div>
  )
}

function UnlockedResources({ courseId }: { courseId: Id<"courses"> }) {
  const resources = useQuery(api.resources.listByCourse, { courseId })
  const convex = useConvex()

  if (resources === undefined) return <ResourcePageLoading />

  const handleDownload = async (resource: Doc<"resources">) => {
    const url = await convex.query(api.files.getUrl, { storageId: resource.storageId })
    if (!url) {
      alert("File not available")
      return
    }
    try {
      await downloadFromUrl(url, resource.fileName)
    } catch (err) {
      alert(`Download failed: ${err instanceof Error ? err.message : "Unknown error"}`)
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <ImageIcon className="w-8 h-8 text-green-600" />
    if (fileType.includes("pdf")) return <FileText className="w-8 h-8 text-red-600" />
    if (fileType.includes("code") || fileType.includes("text/x-")) return <Code className="w-8 h-8 text-blue-600" />
    return <File className="w-8 h-8 text-gray-600" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <>
      <Link href={`/courses/${courseId}`}>
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Course Resources</h1>
        <p className="text-muted-foreground">Download files and materials for this course</p>
      </div>

      <div className="grid gap-4">
        {resources.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FolderOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No resources available</h3>
              <p className="text-muted-foreground">Your tutor has not uploaded any resources yet</p>
            </CardContent>
          </Card>
        ) : (
          resources.map((resource) => (
            <Card key={resource._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{getFileIcon(resource.fileType)}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{resource.title}</h3>
                    {resource.description && (
                      <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{resource.fileName}</span>
                      <span>{formatFileSize(resource.fileSize)}</span>
                      <span>Uploaded {new Date(resource.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button onClick={() => handleDownload(resource)} className="flex-shrink-0">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </>
  )
}
