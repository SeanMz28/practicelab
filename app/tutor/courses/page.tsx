"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Plus, Pencil, Trash2, BookOpen, LockKeyhole } from "lucide-react"
import Link from "next/link"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Doc } from "@/convex/_generated/dataModel"

type CourseWithAccess = Doc<"courses"> & { passwordProtected: boolean }

export default function TutorCoursesPage() {
  const courses = useQuery(api.courses.list) ?? []
  const createCourse = useMutation(api.courses.create)
  const updateCourse = useMutation(api.courses.update)
  const removeCourse = useMutation(api.courses.remove)

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<CourseWithAccess | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    color: "bg-blue-500",
    password: "",
    removePassword: false,
  })

  const handleCreate = async () => {
    if (formData.password && formData.password.length < 4) {
      alert("Course passwords must be at least 4 characters")
      return
    }
    await createCourse({
      name: formData.name,
      code: formData.code,
      description: formData.description,
      color: formData.color,
      password: formData.password || undefined,
    })
    setIsCreateOpen(false)
    resetForm()
  }

  const handleUpdate = async () => {
    if (!editingCourse) return
    if (formData.password && formData.password.length < 4) {
      alert("Course passwords must be at least 4 characters")
      return
    }
    await updateCourse({
      id: editingCourse._id,
      name: formData.name,
      code: formData.code,
      description: formData.description,
      color: formData.color,
      password: formData.password || undefined,
      removePassword: formData.removePassword,
    })
    setEditingCourse(null)
    resetForm()
  }

  const handleDelete = async (id: Doc<"courses">["_id"]) => {
    if (
      confirm("Are you sure you want to delete this course? This will also delete all associated notes and quizzes.")
    ) {
      await removeCourse({ id })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
      color: "bg-blue-500",
      password: "",
      removePassword: false,
    })
  }

  const openEdit = (course: CourseWithAccess) => {
    setEditingCourse(course)
    setFormData({
      name: course.name,
      code: course.code,
      description: course.description,
      color: course.color,
      password: "",
      removePassword: false,
    })
  }

  const colorOptions = [
    { value: "bg-blue-500", label: "Blue" },
    { value: "bg-green-500", label: "Green" },
    { value: "bg-purple-500", label: "Purple" },
    { value: "bg-orange-500", label: "Orange" },
    { value: "bg-red-500", label: "Red" },
    { value: "bg-yellow-500", label: "Yellow" },
    { value: "bg-pink-500", label: "Pink" },
    { value: "bg-indigo-500", label: "Indigo" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Course Management</h1>
            <p className="text-muted-foreground">Create and manage your courses</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
                <DialogDescription>Add a new course to your curriculum</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="code">Course Code</Label>
                  <Input
                    id="code"
                    placeholder="e.g., CS101"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="name">Course Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Introduction to Programming"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief course description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="course-password">Access Password (Optional)</Label>
                  <Input
                    id="course-password"
                    type="password"
                    minLength={4}
                    maxLength={128}
                    placeholder="At least 4 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Students must enter this before viewing the course.</p>
                </div>
                <div>
                  <Label htmlFor="color">Color Theme</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {colorOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData({ ...formData, color: option.value })}
                        className={`h-10 rounded-md ${option.value} ${
                          formData.color === option.value ? "ring-2 ring-offset-2 ring-blue-600" : ""
                        }`}
                        title={option.label}
                      />
                    ))}
                  </div>
                </div>
                <Button onClick={handleCreate} className="w-full">
                  Create Course
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course._id} className="hover:shadow-md transition-shadow">
              <CardHeader className={`${course.color} text-white rounded-t-lg`}>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{course.code}</CardTitle>
                    <p className="text-sm opacity-90 mt-1">{course.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {course.passwordProtected && <LockKeyhole className="w-4 h-4" />}
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                <div className="flex items-center gap-2">
                  <Link href={`/tutor/courses/${course._id}/manage`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Manage
                    </Button>
                  </Link>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => openEdit(course)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                        <DialogDescription>Update course information</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="edit-code">Course Code</Label>
                          <Input
                            id="edit-code"
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-name">Course Name</Label>
                          <Input
                            id="edit-name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-description">Description</Label>
                          <Textarea
                            id="edit-description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-course-password">
                            {editingCourse?.passwordProtected ? "Replace Password" : "Access Password (Optional)"}
                          </Label>
                          <Input
                            id="edit-course-password"
                            type="password"
                            minLength={4}
                            maxLength={128}
                            placeholder={editingCourse?.passwordProtected ? "Leave blank to keep current password" : "At least 4 characters"}
                            value={formData.password}
                            disabled={formData.removePassword}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          />
                          {editingCourse?.passwordProtected && (
                            <label className="mt-2 flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={formData.removePassword}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    removePassword: e.target.checked,
                                    password: e.target.checked ? "" : formData.password,
                                  })
                                }
                              />
                              Remove course password
                            </label>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="edit-color">Color Theme</Label>
                          <div className="grid grid-cols-4 gap-2 mt-2">
                            {colorOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => setFormData({ ...formData, color: option.value })}
                                className={`h-10 rounded-md ${option.value} ${
                                  formData.color === option.value ? "ring-2 ring-offset-2 ring-blue-600" : ""
                                }`}
                                title={option.label}
                              />
                            ))}
                          </div>
                        </div>
                        <Button onClick={handleUpdate} className="w-full">
                          Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(course._id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
