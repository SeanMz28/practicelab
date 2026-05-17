"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Trash2, Download, FileText, File, ImageIcon, FolderOpen, Code } from "lucide-react"
import { useQuery, useMutation, useConvex } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Doc, Id } from "@/convex/_generated/dataModel"
import { downloadFromUrl } from "@/lib/download-file"

interface ResourcesManagerProps {
  courseId: Id<"courses">
}

export function ResourcesManager({ courseId }: ResourcesManagerProps) {
  const convex = useConvex()
  const resources = useQuery(api.resources.listByCourse, { courseId }) ?? []
  const createResource = useMutation(api.resources.create)
  const removeResource = useMutation(api.resources.remove)
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)

  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({ title: "", description: "" })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      if (!formData.title) {
        setFormData({ ...formData, title: file.name })
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file")
      return
    }

    setIsUploading(true)
    try {
      const postUrl = await generateUploadUrl()
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      })
      if (!result.ok) throw new Error("Upload failed")
      const { storageId } = (await result.json()) as { storageId: Id<"_storage"> }

      await createResource({
        courseId,
        title: formData.title || selectedFile.name,
        description: formData.description,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
        storageId,
      })
      setIsUploadOpen(false)
      resetForm()
    } catch (err) {
      alert(`Upload failed: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: Id<"resources">) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      await removeResource({ id })
    }
  }

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

  const resetForm = () => {
    setFormData({ title: "", description: "" })
    setSelectedFile(null)
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Resources</h2>
          <p className="text-muted-foreground">Upload files, documents, and code for students to download</p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Upload Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Resource</DialogTitle>
              <DialogDescription>Share files with your students</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-upload">File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.py,.java,.cpp,.js,.ts,.txt,.zip,.jpg,.jpeg,.png,.gif"
                />
                {selectedFile && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="resource-title">Title</Label>
                <Input
                  id="resource-title"
                  placeholder="Resource title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="resource-description">Description (Optional)</Label>
                <Textarea
                  id="resource-description"
                  placeholder="Brief description of the resource"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <Button onClick={handleUpload} className="w-full" disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload Resource"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {resources.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FolderOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No resources yet</h3>
              <p className="text-muted-foreground">Upload files for students to access</p>
            </CardContent>
          </Card>
        ) : (
          resources.map((resource) => (
            <Card key={resource._id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{getFileIcon(resource.fileType)}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{resource.title}</h3>
                    {resource.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{resource.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{resource.fileName}</span>
                      <span>{formatFileSize(resource.fileSize)}</span>
                      <span>Uploaded {new Date(resource.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="outline" size="icon" onClick={() => handleDownload(resource)}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(resource._id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
