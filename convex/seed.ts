import { v } from "convex/values"
import { mutation } from "./_generated/server"
import type { Id } from "./_generated/dataModel"

const questionValidator = v.object({
  id: v.string(),
  type: v.union(
    v.literal("multiple-choice"),
    v.literal("text"),
    v.literal("file"),
    v.literal("ordered-list"),
    v.literal("memory-verse"),
  ),
  question: v.string(),
  points: v.number(),
  options: v.optional(v.array(v.string())),
  correctAnswer: v.optional(v.number()),
  correctText: v.optional(v.string()),
  correctAnswers: v.optional(v.array(v.string())),
  explanation: v.optional(v.string()),
  acceptedFileTypes: v.optional(v.array(v.string())),
})

export const seedIfEmpty = mutation({
  args: {
    courses: v.array(
      v.object({
        legacyId: v.string(),
        name: v.string(),
        code: v.string(),
        description: v.string(),
        color: v.string(),
      })
    ),
    notes: v.array(
      v.object({
        legacyCourseId: v.string(),
        title: v.string(),
        content: v.string(),
        createdAt: v.string(),
        updatedAt: v.string(),
      })
    ),
    assessments: v.array(
      v.object({
        legacyCourseId: v.string(),
        title: v.string(),
        description: v.string(),
        type: v.union(v.literal("quiz"), v.literal("assignment"), v.literal("test")),
        questions: v.array(questionValidator),
        timeLimit: v.optional(v.number()),
        dueDate: v.optional(v.string()),
        createdAt: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("courses").take(1)
    if (existing.length > 0) return { seeded: false }

    const courseIdMap = new Map<string, Id<"courses">>()
    for (const course of args.courses) {
      const { legacyId, ...rest } = course
      const id = await ctx.db.insert("courses", rest)
      courseIdMap.set(legacyId, id)
    }

    for (const note of args.notes) {
      const courseId = courseIdMap.get(note.legacyCourseId)
      if (!courseId) continue
      const { legacyCourseId: _l, ...rest } = note
      await ctx.db.insert("notes", { ...rest, courseId })
    }

    for (const assessment of args.assessments) {
      const courseId = courseIdMap.get(assessment.legacyCourseId)
      if (!courseId) continue
      const { legacyCourseId: _l, ...rest } = assessment
      await ctx.db.insert("assessments", { ...rest, courseId })
    }

    return { seeded: true, courses: args.courses.length }
  },
})

export const moveAssessment = mutation({
  args: {
    assessmentId: v.id("assessments"),
    newCourseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.assessmentId, { courseId: args.newCourseId })
    return { moved: true }
  },
})

export const deleteCourseIfEmpty = mutation({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const assessments = await ctx.db
      .query("assessments")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect()
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect()
    const resources = await ctx.db
      .query("resources")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect()
    if (assessments.length > 0 || notes.length > 0 || resources.length > 0) {
      return { deleted: false, reason: "course not empty" }
    }
    await ctx.db.delete(args.courseId)
    return { deleted: true }
  },
})

export const ensureCourseWithAssessment = mutation({
  args: {
    course: v.object({
      name: v.string(),
      code: v.string(),
      description: v.string(),
      color: v.string(),
    }),
    assessment: v.object({
      title: v.string(),
      description: v.string(),
      type: v.union(v.literal("quiz"), v.literal("assignment"), v.literal("test")),
      questions: v.array(questionValidator),
      timeLimit: v.optional(v.number()),
      dueDate: v.optional(v.string()),
      createdAt: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const allCourses = await ctx.db.query("courses").collect()
    let course = allCourses.find((c) => c.code === args.course.code)
    let courseId: Id<"courses">
    if (course) {
      courseId = course._id
    } else {
      courseId = await ctx.db.insert("courses", args.course)
    }

    const existingAssessments = await ctx.db
      .query("assessments")
      .withIndex("by_courseId", (q) => q.eq("courseId", courseId))
      .collect()
    const existing = existingAssessments.find((a) => a.title === args.assessment.title)
    if (existing) {
      return { courseId, assessmentId: existing._id, created: false }
    }

    const assessmentId = await ctx.db.insert("assessments", {
      ...args.assessment,
      courseId,
    })
    return { courseId, assessmentId, created: true }
  },
})
