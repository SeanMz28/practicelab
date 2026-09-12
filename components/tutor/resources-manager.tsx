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
import { Plus, Trash2, Download, FileText, File, ImageIcon, FolderOpen, Code, LockKeyhole } from "lucide-react"
import { useQuery, useMutation, useConvex } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Doc, Id } from "@/convex/_generated/dataModel"
import { downloadFromUrl } from "@/lib/download-file"
import { LockStatusBadge } from "@/components/access/lock-status-badge"

interface ResourcesManagerProps {
  courseId: Id<"courses">
}

type ResourceWithAccess = Omit<Doc<"resources">, "storageId"> & {
  storageId: Id<"_storage"> | null
  passwordProtected: boolean
}

export function ResourcesManager({ courseId }: ResourcesManagerProps) {
  const convex = useConvex()
  const resources = useQuery(api.resources.listByCourseForTutor, { courseId }) ?? []
  const createResource = useMutation(api.resources.create)
  const updateResourceAccess = useMutation(api.resources.updateAccess)
  const removeResource = useMutation(api.resources.remove)
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)

  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({ title: "", description: "", locked: false, password: "" })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [editingAccessResource, setEditingAccessResource] = useState<ResourceWithAccess | null>(null)
  const [accessForm, setAccessForm] = useState({ locked: false, password: "", removePassword: false })

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
    if (formData.password && formData.password.length < 4) {
      alert("Resource passwords must be at least 4 characters")
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
        locked: formData.locked,
        password: formData.password || undefined,
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

  const handleDownload = async (resource: ResourceWithAccess) => {
    const url = await convex.query(api.resources.getDownloadUrl, { id: resource._id })
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
    setFormData({ title: "", description: "", locked: false, password: "" })
    setSelectedFile(null)
  }

  const handleAccessUpdate = async () => {
    if (!editingAccessResource) return
    if (accessForm.password && accessForm.password.length < 4) {
      alert("Resource passwords must be at least 4 characters")
      return
    }
    await updateResourceAccess({
      id: editingAccessResource._id,
      locked: accessForm.locked,
      password: accessForm.password || undefined,
      removePassword: accessForm.removePassword,
    })
    setEditingAccessResource(null)
    setAccessForm({ locked: false, password: "", removePassword: false })
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
              <div>
                <Label htmlFor="resource-password">Access Password (Optional)</Label>
                <Input
                  id="resource-password"
                  type="password"
                  minLength={4}
                  maxLength={128}
                  placeholder="At least 4 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Students must enter this before downloading the file.
                </p>
              </div>
              <label className="flex items-start gap-3 rounded-lg border p-4">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={formData.locked}
                  onChange={(e) => setFormData({ ...formData, locked: e.target.checked })}
                />
                <span>
                  <span className="block font-medium">Lock resource</span>
                  <span className="block text-sm text-muted-foreground">
                    Students can see this file but cannot download it.
                  </span>
                </span>
              </label>
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
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-semibold">{resource.title}</h3>
                      <LockStatusBadge locked={resource.locked ?? false} />
                      <LockStatusBadge locked={resource.passwordProtected} label="Password" />
                    </div>
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
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setEditingAccessResource(resource)
                        setAccessForm({
                          locked: resource.locked ?? false,
                          password: "",
                          removePassword: false,
                        })
                      }}
                      title="Manage resource access"
                    >
                      <LockKeyhole className="w-4 h-4" />
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

      <Dialog
        open={!!editingAccessResource}
        onOpenChange={(open) => {
          if (!open) {
            setEditingAccessResource(null)
            setAccessForm({ locked: false, password: "", removePassword: false })
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Resource Access</DialogTitle>
            <DialogDescription>
              Lock the file completely, or use a password when students should be able to unlock it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <label className="flex items-start gap-3 rounded-lg border p-4">
              <input
                type="checkbox"
                className="mt-1"
                checked={accessForm.locked}
                onChange={(e) => setAccessForm({ ...accessForm, locked: e.target.checked })}
              />
              <span>
                <span className="block font-medium">Lock resource</span>
                <span className="block text-sm text-muted-foreground">
                  Students can see this file but cannot download it.
                </span>
              </span>
            </label>
            <div>
              <Label htmlFor="edit-resource-password">
                {editingAccessResource?.passwordProtected ? "Replace Access Password" : "Access Password"}
              </Label>
              <Input
                id="edit-resource-password"
                type="password"
                minLength={4}
                maxLength={128}
                placeholder={
                  editingAccessResource?.passwordProtected
                    ? "Enter a new password"
                    : "At least 4 characters"
                }
                value={accessForm.password}
                disabled={accessForm.removePassword}
                onChange={(e) => setAccessForm({ ...accessForm, password: e.target.value })}
              />
            </div>
            {editingAccessResource?.passwordProtected && (
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={accessForm.removePassword}
                  onChange={(e) =>
                    setAccessForm({
                      locked: accessForm.locked,
                      password: e.target.checked ? "" : accessForm.password,
                      removePassword: e.target.checked,
                    })
                  }
                />
                Remove resource password
              </label>
            )}
            <Button
              onClick={handleAccessUpdate}
              className="w-full"
            >
              Save Access Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
