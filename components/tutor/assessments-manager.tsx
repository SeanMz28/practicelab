"use client"

import { useState } from "react"
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
import { Plus, Pencil, Trash2, Clock, HelpCircle, X, Calendar, ChevronUp, ChevronDown, Check, LockKeyhole, Trophy } from "lucide-react"
import { ClipboardList } from "lucide-react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Doc, Id } from "@/convex/_generated/dataModel"

type Question = Doc<"assessments">["questions"][number]
type AssessmentWithAccess = Doc<"assessments"> & { passwordProtected: boolean }

interface AssessmentsManagerProps {
  courseId: Id<"courses">
}

export function AssessmentsManager({ courseId }: AssessmentsManagerProps) {
  const assessments = useQuery(api.assessments.listByCourse, { courseId }) ?? []
  const createAssessment = useMutation(api.assessments.create)
  const updateAssessment = useMutation(api.assessments.update)
  const removeAssessment = useMutation(api.assessments.remove)

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingAssessment, setEditingAssessment] = useState<AssessmentWithAccess | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "quiz" as "quiz" | "assignment" | "test",
    timeLimit: 30,
    dueDate: "",
    leaderboardEnabled: false,
    password: "",
    removePassword: false,
  })
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: "multiple-choice",
    question: "",
    points: 10,
    options: ["", "", "", ""],
    correctAnswer: 0,
  })
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null)
  const [questionDraft, setQuestionDraft] = useState<Partial<Question>>({})

  const handleCreate = async () => {
    if (questions.length === 0) {
      alert("Please add at least one question")
      return
    }
    if (formData.password && formData.password.length < 4) {
      alert("Assessment passwords must be at least 4 characters")
      return
    }
    await createAssessment({
      courseId,
      title: formData.title,
      description: formData.description,
      type: formData.type,
      questions,
      timeLimit: formData.type === "assignment" ? undefined : formData.timeLimit,
      dueDate: formData.type === "assignment" ? formData.dueDate || undefined : undefined,
      leaderboardEnabled: formData.type === "quiz" && formData.leaderboardEnabled,
      password: formData.password || undefined,
    })
    setIsCreateOpen(false)
    resetForm()
  }

  const handleUpdate = async () => {
    if (!editingAssessment || questions.length === 0) return
    if (formData.password && formData.password.length < 4) {
      alert("Assessment passwords must be at least 4 characters")
      return
    }
    await updateAssessment({
      id: editingAssessment._id,
      title: formData.title,
      description: formData.description,
      type: formData.type,
      questions,
      timeLimit: formData.type === "assignment" ? undefined : formData.timeLimit,
      dueDate: formData.type === "assignment" ? formData.dueDate || undefined : undefined,
      leaderboardEnabled: formData.type === "quiz" && formData.leaderboardEnabled,
      password: formData.password || undefined,
      removePassword: formData.removePassword,
    })
    setEditingAssessment(null)
    resetForm()
  }

  const handleDelete = async (id: Id<"assessments">) => {
    if (confirm("Are you sure you want to delete this assessment?")) {
      await removeAssessment({ id })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "quiz",
      timeLimit: 30,
      dueDate: "",
      leaderboardEnabled: false,
      password: "",
      removePassword: false,
    })
    setQuestions([])
    setCurrentQuestion({
      type: "multiple-choice",
      question: "",
      points: 10,
      options: ["", "", "", ""],
      correctAnswer: 0,
    })
    setEditingQuestionIndex(null)
    setQuestionDraft({})
  }

  const startEditQuestion = (index: number) => {
    const q = questions[index]
    setEditingQuestionIndex(index)
    setQuestionDraft({
      ...q,
      options: q.options ? [...q.options] : ["", "", "", ""],
      acceptedFileTypes: q.acceptedFileTypes ? [...q.acceptedFileTypes] : undefined,
    })
  }

  const cancelEditQuestion = () => {
    setEditingQuestionIndex(null)
    setQuestionDraft({})
  }

  const saveEditQuestion = () => {
    if (editingQuestionIndex === null) return
    if (!questionDraft.question?.trim()) {
      alert("Please enter a question")
      return
    }
    if (questionDraft.type === "memory-verse" && !questionDraft.correctText?.trim()) {
      alert("Please enter the correct scripture wording")
      return
    }
    if (
      questionDraft.type === "ordered-list" &&
      !questionDraft.correctAnswers?.some((answer) => answer.trim())
    ) {
      alert("Please enter at least one expected answer")
      return
    }
    const original = questions[editingQuestionIndex]
    const updated: Question = {
      id: original.id,
      type: questionDraft.type ?? original.type,
      question: questionDraft.question,
      points: questionDraft.points && questionDraft.points > 0 ? questionDraft.points : original.points,
      ...(questionDraft.type === "multiple-choice" && {
        options: questionDraft.options,
        correctAnswer: questionDraft.correctAnswer ?? 0,
        explanation: questionDraft.explanation,
      }),
      ...(questionDraft.type === "file" && {
        acceptedFileTypes: questionDraft.acceptedFileTypes ?? original.acceptedFileTypes ?? [".pdf", ".doc", ".docx"],
      }),
      ...(questionDraft.type === "memory-verse" && {
        correctText: questionDraft.correctText?.trim(),
      }),
      ...(questionDraft.type === "ordered-list" && {
        correctAnswers: questionDraft.correctAnswers?.map((answer) => answer.trim()).filter(Boolean),
      }),
    }
    const next = [...questions]
    next[editingQuestionIndex] = updated
    setQuestions(next)
    cancelEditQuestion()
  }

  const updateDraftOption = (i: number, value: string) => {
    const opts = [...(questionDraft.options || ["", "", "", ""])]
    opts[i] = value
    setQuestionDraft({ ...questionDraft, options: opts })
  }

  const moveQuestion = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= questions.length) return
    const next = [...questions]
    ;[next[index], next[target]] = [next[target], next[index]]
    setQuestions(next)
    if (editingQuestionIndex === index) setEditingQuestionIndex(target)
    else if (editingQuestionIndex === target) setEditingQuestionIndex(index)
  }

  const openEdit = (assessment: AssessmentWithAccess) => {
    setEditingAssessment(assessment)
    setFormData({
      title: assessment.title,
      description: assessment.description,
      type: assessment.type,
      timeLimit: assessment.timeLimit || 30,
      dueDate: assessment.dueDate || "",
      leaderboardEnabled: assessment.leaderboardEnabled ?? false,
      password: "",
      removePassword: false,
    })
    setQuestions([...assessment.questions])
  }

  const addQuestion = () => {
    if (!currentQuestion.question) {
      alert("Please enter a question")
      return
    }
    if (currentQuestion.type === "memory-verse" && !currentQuestion.correctText?.trim()) {
      alert("Please enter the correct scripture wording")
      return
    }
    if (
      currentQuestion.type === "ordered-list" &&
      !currentQuestion.correctAnswers?.some((answer) => answer.trim())
    ) {
      alert("Please enter at least one expected answer")
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
      ...(currentQuestion.type === "memory-verse" && {
        correctText: currentQuestion.correctText?.trim(),
      }),
      ...(currentQuestion.type === "ordered-list" && {
        correctAnswers: currentQuestion.correctAnswers?.map((answer) => answer.trim()).filter(Boolean),
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

  const getAssessmentTypeLabel = (type: string) => type.charAt(0).toUpperCase() + type.slice(1)

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
                      <SelectItem value="assignment">Assignment (Deadline)</SelectItem>
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
                    <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                    <Input
                      id="time-limit"
                      type="number"
                      min="5"
                      value={formData.timeLimit}
                      onChange={(e) => setFormData({ ...formData, timeLimit: Number.parseInt(e.target.value) })}
                    />
                  </div>
                )}
                {formData.type === "quiz" && (
                  <label className="flex items-start gap-3 rounded-lg border p-4">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={formData.leaderboardEnabled}
                      onChange={(e) => setFormData({ ...formData, leaderboardEnabled: e.target.checked })}
                    />
                    <span>
                      <span className="block font-medium">Show leaderboard</span>
                      <span className="block text-sm text-muted-foreground">
                        Students can compare everyone&apos;s latest and first-attempt scores.
                      </span>
                    </span>
                  </label>
                )}
                <div>
                  <Label htmlFor="assessment-password">
                    {editingAssessment?.passwordProtected ? "Replace Access Password" : "Access Password (Optional)"}
                  </Label>
                  <Input
                    id="assessment-password"
                    type="password"
                    minLength={4}
                    maxLength={128}
                    placeholder={editingAssessment?.passwordProtected ? "Leave blank to keep current password" : "At least 4 characters"}
                    value={formData.password}
                    disabled={formData.removePassword}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Students must enter this in addition to any course password.
                  </p>
                  {editingAssessment?.passwordProtected && (
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
                      Remove assessment password
                    </label>
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Questions ({questions.length})</h3>

                {questions.map((q, index) => {
                  const isEditing = editingQuestionIndex === index
                  return (
                    <Card
                      key={q.id ?? index}
                      className={`mb-3 ${isEditing ? "border-blue-500 ring-1 ring-blue-200" : ""}`}
                    >
                      <CardContent className="p-4">
                        {isEditing ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">Editing Q{index + 1}</span>
                              <span className="text-xs text-muted-foreground">
                                Save or cancel before editing another question
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Question Type</Label>
                                <Select
                                  value={questionDraft.type}
                                  onValueChange={(value: any) =>
                                    setQuestionDraft({ ...questionDraft, type: value })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                    <SelectItem value="text">Text Answer</SelectItem>
                                    <SelectItem value="file">File Upload</SelectItem>
                                    <SelectItem value="ordered-list">Ordered List</SelectItem>
                                    <SelectItem value="memory-verse">Memory Scripture</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Points</Label>
                                <Input
                                  type="number"
                                  min="1"
                                  value={questionDraft.points ?? 1}
                                  onChange={(e) =>
                                    setQuestionDraft({
                                      ...questionDraft,
                                      points: Number.parseInt(e.target.value) || 1,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <Label>Question</Label>
                              <Textarea
                                value={questionDraft.question || ""}
                                onChange={(e) =>
                                  setQuestionDraft({ ...questionDraft, question: e.target.value })
                                }
                              />
                            </div>
                            {questionDraft.type === "multiple-choice" && (
                              <>
                                <div>
                                  <Label>Options</Label>
                                  <div className="space-y-2">
                                    {(questionDraft.options ?? ["", "", "", ""]).map((opt, i) => (
                                      <div key={i} className="flex items-center gap-2">
                                        <span className="text-sm w-6">{String.fromCharCode(65 + i)}.</span>
                                        <Input
                                          placeholder={`Option ${i + 1}`}
                                          value={opt}
                                          onChange={(e) => updateDraftOption(i, e.target.value)}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <Label>Correct Answer</Label>
                                  <Select
                                    value={(questionDraft.correctAnswer ?? 0).toString()}
                                    onValueChange={(value) =>
                                      setQuestionDraft({
                                        ...questionDraft,
                                        correctAnswer: Number.parseInt(value),
                                      })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {(questionDraft.options ?? []).map((_, i) => (
                                        <SelectItem key={i} value={i.toString()}>
                                          Option {String.fromCharCode(65 + i)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Explanation (Optional)</Label>
                                  <Textarea
                                    value={questionDraft.explanation ?? ""}
                                    onChange={(e) =>
                                      setQuestionDraft({ ...questionDraft, explanation: e.target.value })
                                    }
                                  />
                                </div>
                              </>
                            )}
                            {questionDraft.type === "file" && (
                              <div>
                                <Label>Accepted File Types</Label>
                                <Input
                                  placeholder="e.g., .py, .java, .pdf"
                                  value={questionDraft.acceptedFileTypes?.join(", ") ?? ""}
                                  onChange={(e) =>
                                    setQuestionDraft({
                                      ...questionDraft,
                                      acceptedFileTypes: e.target.value
                                        .split(",")
                                        .map((s) => s.trim())
                                        .filter(Boolean),
                                    })
                                  }
                                />
                              </div>
                            )}
                            {questionDraft.type === "memory-verse" && (
                              <div>
                                <Label>Correct Wording</Label>
                                <Textarea
                                  className="min-h-28"
                                  placeholder="Enter the scripture exactly as it should be spelled"
                                  value={questionDraft.correctText ?? ""}
                                  onChange={(e) =>
                                    setQuestionDraft({ ...questionDraft, correctText: e.target.value })
                                  }
                                />
                                <p className="mt-1 text-xs text-muted-foreground">
                                  Grading ignores capitalization and punctuation, but checks spelling and word order.
                                </p>
                              </div>
                            )}
                            {questionDraft.type === "ordered-list" && (
                              <div>
                                <Label>Correct Answers in Order</Label>
                                <Textarea
                                  className="min-h-32"
                                  placeholder={"Genesis\nExodus\nLeviticus"}
                                  value={questionDraft.correctAnswers?.join("\n") ?? ""}
                                  onChange={(e) =>
                                    setQuestionDraft({
                                      ...questionDraft,
                                      correctAnswers: e.target.value
                                        .split("\n"),
                                    })
                                  }
                                />
                                <p className="mt-1 text-xs text-muted-foreground">Enter one answer per line.</p>
                              </div>
                            )}
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={cancelEditQuestion}>
                                Cancel
                              </Button>
                              <Button onClick={saveEditQuestion}>
                                <Check className="w-4 h-4 mr-2" />
                                Save Question
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">Q{index + 1}:</span>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{q.type}</span>
                                <span className="text-xs text-muted-foreground">{q.points} points</span>
                              </div>
                              <p className="text-sm whitespace-pre-wrap">{q.question}</p>
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
                              {q.type === "file" && q.acceptedFileTypes && q.acceptedFileTypes.length > 0 && (
                                <p className="mt-2 text-xs text-muted-foreground">
                                  Accepts: {q.acceptedFileTypes.join(", ")}
                                </p>
                              )}
                              {q.type === "memory-verse" && q.correctText && (
                                <p className="mt-2 text-xs text-green-700">Correct wording: {q.correctText}</p>
                              )}
                              {q.type === "ordered-list" && q.correctAnswers && (
                                <p className="mt-2 text-xs text-green-700">
                                  Correct order: {q.correctAnswers.join(" → ")}
                                </p>
                              )}
                              {q.explanation && (
                                <p className="mt-2 text-xs text-muted-foreground italic">
                                  Explanation: {q.explanation}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col items-center gap-1 ml-2">
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Move up"
                                  disabled={editingQuestionIndex !== null || index === 0}
                                  onClick={() => moveQuestion(index, -1)}
                                >
                                  <ChevronUp className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Move down"
                                  disabled={editingQuestionIndex !== null || index === questions.length - 1}
                                  onClick={() => moveQuestion(index, 1)}
                                >
                                  <ChevronDown className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit question"
                                  disabled={editingQuestionIndex !== null}
                                  onClick={() => startEditQuestion(index)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Remove question"
                                  disabled={editingQuestionIndex !== null}
                                  onClick={() => removeQuestion(index)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}

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
                            <SelectItem value="ordered-list">Ordered List</SelectItem>
                            <SelectItem value="memory-verse">Memory Scripture</SelectItem>
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

                    {currentQuestion.type === "memory-verse" && (
                      <div>
                        <Label htmlFor="correct-text">Correct Wording</Label>
                        <Textarea
                          id="correct-text"
                          className="min-h-28"
                          placeholder="Enter the scripture exactly as it should be spelled"
                          value={currentQuestion.correctText ?? ""}
                          onChange={(e) =>
                            setCurrentQuestion({ ...currentQuestion, correctText: e.target.value })
                          }
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          Grading ignores capitalization and punctuation, but checks spelling and word order.
                        </p>
                      </div>
                    )}

                    {currentQuestion.type === "ordered-list" && (
                      <div>
                        <Label htmlFor="correct-answers">Correct Answers in Order</Label>
                        <Textarea
                          id="correct-answers"
                          className="min-h-32"
                          placeholder={"Genesis\nExodus\nLeviticus"}
                          value={currentQuestion.correctAnswers?.join("\n") ?? ""}
                          onChange={(e) =>
                            setCurrentQuestion({
                              ...currentQuestion,
                              correctAnswers: e.target.value
                                .split("\n"),
                            })
                          }
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Enter one answer per line.</p>
                      </div>
                    )}

                    <Button
                      onClick={addQuestion}
                      variant="outline"
                      className="w-full bg-transparent"
                      disabled={editingQuestionIndex !== null}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Question
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {editingQuestionIndex !== null && (
                <p className="text-xs text-amber-600 text-center">
                  Save or cancel the open question edit before saving the assessment.
                </p>
              )}
              <Button
                onClick={editingAssessment ? handleUpdate : handleCreate}
                className="w-full"
                disabled={editingQuestionIndex !== null}
              >
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
            <Card key={assessment._id}>
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
                      {assessment.passwordProtected && (
                        <span title="Password protected"><LockKeyhole className="w-4 h-4 text-muted-foreground" /></span>
                      )}
                      {assessment.type === "quiz" && assessment.leaderboardEnabled && (
                        <span title="Leaderboard enabled"><Trophy className="w-4 h-4 text-amber-500" /></span>
                      )}
                    </div>
                    <CardDescription className="mt-1">{assessment.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => openEdit(assessment)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(assessment._id)}>
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
                      <span>{assessment.timeLimit} minutes</span>
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
