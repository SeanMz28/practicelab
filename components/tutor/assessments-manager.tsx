"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, Clock, HelpCircle, X, Calendar } from "lucide-react"
import { ClipboardList } from "lucide-react"
import type { Assessment, Question } from "@/lib/dummy-data"

interface AssessmentsManagerProps {
  courseId: string
}

export function AssessmentsManager({ courseId }: AssessmentsManagerProps) {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "quiz" as "quiz" | "assignment" | "test",
    timeLimit: 30,
    dueDate: "",
  })
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: "multiple-choice",
    question: "",
    points: 10,
    options: ["", "", "", ""],
    correctAnswer: 0,
  })

  useEffect(() => {
    loadAssessments()
  }, [courseId])

  const loadAssessments = () => {
    const stored = JSON.parse(localStorage.getItem("assessments") || "[]")
    setAssessments(stored.filter((a: Assessment) => a.courseId === courseId))
  }

  const saveAssessments = (updatedAssessments: Assessment[]) => {
    const allAssessments = JSON.parse(localStorage.getItem("assessments") || "[]")
    const otherAssessments = allAssessments.filter((a: Assessment) => a.courseId !== courseId)
    localStorage.setItem("assessments", JSON.stringify([...otherAssessments, ...updatedAssessments]))
    setAssessments(updatedAssessments)
  }

  const handleCreate = () => {
    if (questions.length === 0) {
      alert("Please add at least one question")
      return
    }

    const newAssessment: Assessment = {
      id: Date.now().toString(),
      courseId,
      ...formData,
      questions,
      createdAt: new Date().toISOString(),
    }
    saveAssessments([...assessments, newAssessment])
    setIsCreateOpen(false)
    resetForm()
  }

  const handleUpdate = () => {
    if (!editingAssessment || questions.length === 0) return

    const updated = assessments.map((a) =>
      a.id === editingAssessment.id ? { ...editingAssessment, ...formData, questions } : a,
    )
    saveAssessments(updated)
    setEditingAssessment(null)
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this assessment?")) {
      saveAssessments(assessments.filter((a) => a.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({ title: "", description: "", type: "quiz", timeLimit: 30, dueDate: "" })
    setQuestions([])
    setCurrentQuestion({
      type: "multiple-choice",
      question: "",
      points: 10,
      options: ["", "", "", ""],
      correctAnswer: 0,
    })
  }

  const openEdit = (assessment: Assessment) => {
    setEditingAssessment(assessment)
    setFormData({
      title: assessment.title,
      description: assessment.description,
      type: assessment.type,
      timeLimit: assessment.timeLimit || 30,
      dueDate: assessment.dueDate || "",
    })
    setQuestions([...assessment.questions])
  }

  const addQuestion = () => {
    if (!currentQuestion.question) {
      alert("Please enter a question")
      return
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      type: currentQuestion.type!,
      question: currentQuestion.question,
      points: currentQuestion.points || 10,
      ...(currentQuestion.type === "multiple-choice" && {
        options: currentQuestion.options,
        correctAnswer: currentQuestion.correctAnswer,
        explanation: currentQuestion.explanation,
      }),
      ...(currentQuestion.type === "file" && {
        acceptedFileTypes: currentQuestion.acceptedFileTypes || [".pdf", ".doc", ".docx"],
      }),
    }

    setQuestions([...questions, newQuestion])
    setCurrentQuestion({
      type: "multiple-choice",
      question: "",
      points: 10,
      options: ["", "", "", ""],
      correctAnswer: 0,
    })
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || [])]
    newOptions[index] = value
    setCurrentQuestion({ ...currentQuestion, options: newOptions })
  }

  const getAssessmentTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  const getAssessmentTypeBadge = (type: string) => {
    const badges = {
      quiz: "bg-blue-100 text-blue-700",
      assignment: "bg-green-100 text-green-700",
      test: "bg-purple-100 text-purple-700",
    }
    return badges[type as keyof typeof badges] || "bg-gray-100 text-gray-700"
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Assessments</h2>
          <p className="text-muted-foreground">Create and manage quizzes, assignments, and tests</p>
        </div>
        <Dialog
          open={isCreateOpen || !!editingAssessment}
          onOpenChange={(open) => {
            setIsCreateOpen(open)
            if (!open) {
              setEditingAssessment(null)
              resetForm()
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Assessment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingAssessment ? "Edit Assessment" : "Create New Assessment"}</DialogTitle>
              <DialogDescription>Add assessment details and questions</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="assessment-type">Assessment Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quiz">Quiz (Timed in minutes)</SelectItem>
                      <SelectItem value="assignment">Assignment (Deadline in days)</SelectItem>
                      <SelectItem value="test">Test (Long timed assessment)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="assessment-title">Title</Label>
                  <Input
                    id="assessment-title"
                    placeholder="e.g., Python Basics Quiz"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="assessment-description">Description</Label>
                  <Textarea
                    id="assessment-description"
                    placeholder="Brief description of the assessment"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {formData.type === "assignment" ? (
                  <div>
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input
                      id="due-date"
                      type="datetime-local"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="time-limit">
                      Time Limit ({formData.type === "quiz" ? "minutes" : "minutes for test"})
                    </Label>
                    <Input
                      id="time-limit"
                      type="number"
                      min="5"
                      value={formData.timeLimit}
                      onChange={(e) => setFormData({ ...formData, timeLimit: Number.parseInt(e.target.value) })}
                    />
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Questions ({questions.length})</h3>

                {questions.map((q, index) => (
                  <Card key={index} className="mb-3">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">Q{index + 1}:</span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{q.type}</span>
                            <span className="text-xs text-muted-foreground">{q.points} points</span>
                          </div>
                          <p className="text-sm">{q.question}</p>
                          {q.type === "multiple-choice" && (
                            <div className="mt-2 space-y-1">
                              {q.options?.map((opt, i) => (
                                <div key={i} className="text-xs flex items-center gap-2">
                                  <span className={i === q.correctAnswer ? "text-green-600 font-semibold" : ""}>
                                    {String.fromCharCode(65 + i)}. {opt}
                                  </span>
                                  {i === q.correctAnswer && <span className="text-green-600">(Correct)</span>}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeQuestion(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-base">Add New Question</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="question-type">Question Type</Label>
                        <Select
                          value={currentQuestion.type}
                          onValueChange={(value: any) => setCurrentQuestion({ ...currentQuestion, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                            <SelectItem value="text">Text Answer</SelectItem>
                            <SelectItem value="file">File Upload</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="question-points">Points</Label>
                        <Input
                          id="question-points"
                          type="number"
                          min="1"
                          value={currentQuestion.points}
                          onChange={(e) =>
                            setCurrentQuestion({ ...currentQuestion, points: Number.parseInt(e.target.value) })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="question-text">Question</Label>
                      <Textarea
                        id="question-text"
                        placeholder="Enter your question"
                        value={currentQuestion.question}
                        onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                      />
                    </div>

                    {currentQuestion.type === "multiple-choice" && (
                      <>
                        <div>
                          <Label>Options</Label>
                          <div className="space-y-2">
                            {currentQuestion.options?.map((opt, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className="text-sm w-6">{String.fromCharCode(65 + i)}.</span>
                                <Input
                                  placeholder={`Option ${i + 1}`}
                                  value={opt}
                                  onChange={(e) => updateOption(i, e.target.value)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="correct-answer">Correct Answer</Label>
                          <Select
                            value={currentQuestion.correctAnswer?.toString()}
                            onValueChange={(value) =>
                              setCurrentQuestion({ ...currentQuestion, correctAnswer: Number.parseInt(value) })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {currentQuestion.options?.map((_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  Option {String.fromCharCode(65 + i)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="explanation">Explanation (Optional)</Label>
                          <Textarea
                            id="explanation"
                            placeholder="Explain the correct answer"
                            value={currentQuestion.explanation || ""}
                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
                          />
                        </div>
                      </>
                    )}

                    {currentQuestion.type === "file" && (
                      <div>
                        <Label htmlFor="accepted-types">Accepted File Types</Label>
                        <Input
                          id="accepted-types"
                          placeholder="e.g., .py, .java, .pdf"
                          value={currentQuestion.acceptedFileTypes?.join(", ") || ""}
                          onChange={(e) =>
                            setCurrentQuestion({
                              ...currentQuestion,
                              acceptedFileTypes: e.target.value.split(",").map((s) => s.trim()),
                            })
                          }
                        />
                      </div>
                    )}

                    <Button onClick={addQuestion} variant="outline" className="w-full bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Question
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Button onClick={editingAssessment ? handleUpdate : handleCreate} className="w-full">
                {editingAssessment ? "Save Changes" : "Create Assessment"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {assessments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ClipboardList className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No assessments yet</h3>
              <p className="text-muted-foreground">Create your first assessment to get started</p>
            </CardContent>
          </Card>
        ) : (
          assessments.map((assessment) => (
            <Card key={assessment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle>{assessment.title}</CardTitle>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${getAssessmentTypeBadge(assessment.type)}`}
                      >
                        {getAssessmentTypeLabel(assessment.type)}
                      </span>
                    </div>
                    <CardDescription className="mt-1">{assessment.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => openEdit(assessment)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(assessment.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>{assessment.questions.length} questions</span>
                  </div>
                  {assessment.type === "assignment" && assessment.dueDate ? (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {new Date(assessment.dueDate).toLocaleDateString()}</span>
                    </div>
                  ) : assessment.timeLimit ? (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {assessment.type === "assignment"
                          ? `${assessment.timeLimit} days`
                          : `${assessment.timeLimit} minutes`}
                      </span>
                    </div>
                  ) : null}
                  <span className="text-xs">Created {new Date(assessment.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
