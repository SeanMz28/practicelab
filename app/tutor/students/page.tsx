"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, TrendingUp, Award, Clock, CheckCircle2 } from "lucide-react"
import type { AssessmentAttempt, Course, Assessment } from "@/lib/dummy-data"
import Link from "next/link"

interface StudentProgress {
  userId: string
  userName: string
  totalAttempts: number
  completedAssessments: number
  pendingAssessments: number
  averageScore: number
  lastActivity: string
}

export default function TutorStudentsPage() {
  const [students, setStudents] = useState<StudentProgress[]>([])
  const [allAttempts, setAllAttempts] = useState<AssessmentAttempt[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const attempts = JSON.parse(localStorage.getItem("assessmentAttempts") || "[]")
    const coursesData = JSON.parse(localStorage.getItem("courses") || "[]")
    const assessmentsData = JSON.parse(localStorage.getItem("assessments") || "[]")

    setAllAttempts(attempts)
    setCourses(coursesData)
    setAssessments(assessmentsData)

    const studentMap = new Map<string, StudentProgress>()

    attempts.forEach((attempt: AssessmentAttempt) => {
      const existing = studentMap.get(attempt.userId)
      const isCompleted = attempt.status === "graded"
      const isPending = attempt.status === "pending"

      if (!existing) {
        studentMap.set(attempt.userId, {
          userId: attempt.userId,
          userName: `Student ${attempt.userId.slice(-4)}`,
          totalAttempts: 1,
          completedAssessments: isCompleted ? 1 : 0,
          pendingAssessments: isPending ? 1 : 0,
          averageScore: attempt.score || 0,
          lastActivity: attempt.completedAt,
        })
      } else {
        existing.totalAttempts++
        if (isCompleted) {
          existing.completedAssessments++
          const totalScore = existing.averageScore * (existing.completedAssessments - 1) + (attempt.score || 0)
          existing.averageScore = totalScore / existing.completedAssessments
        }
        if (isPending) {
          existing.pendingAssessments++
        }
        if (new Date(attempt.completedAt) > new Date(existing.lastActivity)) {
          existing.lastActivity = attempt.completedAt
        }
      }
    })

    setStudents(Array.from(studentMap.values()))
  }

  const getStudentAttempts = (userId: string) => {
    return allAttempts.filter((a) => a.userId === userId)
  }

  const getAssessmentName = (assessmentId: string) => {
    const assessment = assessments.find((a) => a.id === assessmentId)
    return assessment?.title || "Unknown Assessment"
  }

  const getCourseName = (assessmentId: string) => {
    const assessment = assessments.find((a) => a.id === assessmentId)
    if (!assessment) return "Unknown Course"
    const course = courses.find((c) => c.id === assessment.courseId)
    return course?.code || "Unknown Course"
  }

  const overallStats = {
    totalStudents: students.length,
    totalSubmissions: allAttempts.length,
    pendingReviews: allAttempts.filter((a) => a.status === "pending").length,
    averageScore: students.length > 0 ? students.reduce((sum, s) => sum + s.averageScore, 0) / students.length : 0,
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Progress</h1>
          <p className="text-muted-foreground">Monitor student performance and activity</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.totalSubmissions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.pendingReviews}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Award className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.averageScore.toFixed(1)}%</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed View</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance Overview</CardTitle>
                <CardDescription>Summary of all student progress</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Total Attempts</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Pending</TableHead>
                      <TableHead>Avg Score</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No student activity yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      students.map((student) => (
                        <TableRow key={student.userId}>
                          <TableCell className="font-medium">{student.userName}</TableCell>
                          <TableCell>{student.totalAttempts}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              {student.completedAssessments}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-yellow-600" />
                              {student.pendingAssessments}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={student.averageScore >= 70 ? "default" : "destructive"}>
                              {student.averageScore.toFixed(1)}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(student.lastActivity).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student.userId)}>
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <div className="space-y-4">
              {students.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No student activity</h3>
                    <p className="text-muted-foreground">Student submissions will appear here</p>
                  </CardContent>
                </Card>
              ) : (
                students.map((student) => {
                  const studentAttempts = getStudentAttempts(student.userId)
                  const isExpanded = selectedStudent === student.userId

                  return (
                    <Card key={student.userId}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{student.userName}</CardTitle>
                            <CardDescription>
                              {student.totalAttempts} assessment attempts · Average score:{" "}
                              {student.averageScore.toFixed(1)}%
                            </CardDescription>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedStudent(isExpanded ? null : student.userId)}
                          >
                            {isExpanded ? "Hide" : "Show"} Details
                          </Button>
                        </div>
                      </CardHeader>
                      {isExpanded && (
                        <CardContent>
                          <div className="space-y-3">
                            {studentAttempts.map((attempt) => (
                              <div key={attempt.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium">{getAssessmentName(attempt.assessmentId)}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {getCourseName(attempt.assessmentId)}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>Submitted {new Date(attempt.completedAt).toLocaleDateString()}</span>
                                    <span>{attempt.totalQuestions} questions</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  {attempt.status === "graded" ? (
                                    <>
                                      <Badge variant={attempt.score! >= 70 ? "default" : "destructive"}>
                                        {attempt.score}%
                                      </Badge>
                                      <Link
                                        href={`/courses/${getCourseName(attempt.assessmentId)}/assessments/${attempt.assessmentId}/results?attemptId=${attempt.id}`}
                                      >
                                        <Button variant="outline" size="sm">
                                          View Results
                                        </Button>
                                      </Link>
                                    </>
                                  ) : (
                                    <>
                                      <Badge variant="secondary">Pending</Badge>
                                      <Link href={`/tutor/grading/${attempt.id}`}>
                                        <Button size="sm">Grade Now</Button>
                                      </Link>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  )
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
