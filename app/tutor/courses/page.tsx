"use client"

import { useState, useEffect } from "react"
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
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react"
import type { Course } from "@/lib/dummy-data"
import Link from "next/link"

export default function TutorCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    color: "bg-blue-500",
  })

  useEffect(() => {
    const stored = localStorage.getItem("courses")
    if (stored) {
      setCourses(JSON.parse(stored))
    }
  }, [])

  const saveCourses = (updatedCourses: Course[]) => {
    setCourses(updatedCourses)
    localStorage.setItem("courses", JSON.stringify(updatedCourses))
  }

  const handleCreate = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      ...formData,
    }
    saveCourses([...courses, newCourse])
    setIsCreateOpen(false)
    resetForm()
  }

  const handleUpdate = () => {
    if (!editingCourse) return
    const updated = courses.map((c) => (c.id === editingCourse.id ? { ...editingCourse, ...formData } : c))
    saveCourses(updated)
    setEditingCourse(null)
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (
      confirm("Are you sure you want to delete this course? This will also delete all associated notes and quizzes.")
    ) {
      saveCourses(courses.filter((c) => c.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({ name: "", code: "", description: "", color: "bg-blue-500" })
  }

  const openEdit = (course: Course) => {
    setEditingCourse(course)
    setFormData({
      name: course.name,
      code: course.code,
      description: course.description,
      color: course.color,
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
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardHeader className={`${course.color} text-white rounded-t-lg`}>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{course.code}</CardTitle>
                    <p className="text-sm opacity-90 mt-1">{course.name}</p>
                  </div>
                  <BookOpen className="w-5 h-5" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                <div className="flex items-center gap-2">
                  <Link href={`/tutor/courses/${course.id}/manage`} className="flex-1">
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
                  <Button variant="outline" size="icon" onClick={() => handleDelete(course.id)}>
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
