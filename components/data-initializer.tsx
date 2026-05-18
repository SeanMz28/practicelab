"use client"

import { useEffect, useRef } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { dummyCourses, dummyNotes, dummyAssessments } from "@/lib/dummy-data"

export function DataInitializer() {
  const seedIfEmpty = useMutation(api.seed.seedIfEmpty)
  const ensureCourseWithAssessment = useMutation(api.seed.ensureCourseWithAssessment)
  const ensureProfile = useMutation(api.users.ensureProfile)
  const me = useQuery(api.users.me)
  const profileEnsured = useRef(false)
  const hasRun = useRef(false)

  useEffect(() => {
    if (profileEnsured.current) return
    if (!me) return
    profileEnsured.current = true
    ensureProfile().catch((err) => console.error("ensureProfile failed", err))
  }, [me, ensureProfile])

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    seedIfEmpty({
      courses: dummyCourses.map((c) => ({
        legacyId: c.id,
        name: c.name,
        code: c.code,
        description: c.description,
        color: c.color,
      })),
      notes: dummyNotes.map((n) => ({
        legacyCourseId: n.courseId,
        title: n.title,
        content: n.content,
        createdAt: n.createdAt,
        updatedAt: n.updatedAt,
      })),
      assessments: dummyAssessments.map((a) => ({
        legacyCourseId: a.courseId,
        title: a.title,
        description: a.description,
        type: a.type,
        questions: a.questions,
        timeLimit: a.timeLimit,
        dueDate: a.dueDate,
        createdAt: a.createdAt,
      })),
    })
      .then(() => {
        const pcCourse = dummyCourses.find((c) => c.code === "COMS3008A")
        const pcTest = dummyAssessments.find(
          (a) => a.courseId === pcCourse?.id && a.title === "Practice Test 1",
        )
        if (!pcCourse || !pcTest) return
        return ensureCourseWithAssessment({
          course: {
            name: pcCourse.name,
            code: pcCourse.code,
            description: pcCourse.description,
            color: pcCourse.color,
          },
          assessment: {
            title: pcTest.title,
            description: pcTest.description,
            type: pcTest.type,
            questions: pcTest.questions,
            timeLimit: pcTest.timeLimit,
            dueDate: pcTest.dueDate,
            createdAt: pcTest.createdAt,
          },
        })
      })
      .catch((err) => {
        console.error("Seed failed", err)
      })
  }, [seedIfEmpty, ensureCourseWithAssessment])

  return null
}
