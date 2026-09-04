import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireTutor } from "./users"
import {
  canAccessAssessment,
  canAccessCourse,
  configureResourcePassword,
  isResourcePasswordProtected,
  removeResourceAccess,
} from "./access"

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

export const list = query({
  args: {},
  handler: async (ctx) => {
    const assessments = await ctx.db.query("assessments").collect()
    return Promise.all(
      assessments.map(async ({ questions, ...assessment }) => ({
        ...assessment,
        questionCount: questions.length,
        passwordProtected: await isResourcePasswordProtected(
          ctx,
          "assessment",
          assessment._id,
        ),
      })),
    )
  },
})

export const listByCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    const assessments = await ctx.db
      .query("assessments")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect()
    return Promise.all(
      assessments.map(async (assessment) => ({
        ...assessment,
        passwordProtected: await isResourcePasswordProtected(
          ctx,
          "assessment",
          assessment._id,
        ),
      })),
    )
  },
})

export const listSummariesByCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    if (!(await canAccessCourse(ctx, args.courseId))) return []
    const assessments = await ctx.db
      .query("assessments")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect()
    return Promise.all(
      assessments.map(async ({ questions, ...assessment }) => ({
        ...assessment,
        questionCount: questions.length,
        passwordProtected: await isResourcePasswordProtected(
          ctx,
          "assessment",
          assessment._id,
        ),
      })),
    )
  },
})

export const getMetadata = query({
  args: { id: v.id("assessments") },
  handler: async (ctx, args) => {
    const assessment = await ctx.db.get(args.id)
    if (!assessment) return null
    const { questions, ...metadata } = assessment
    return {
      ...metadata,
      questionCount: questions.length,
      passwordProtected: await isResourcePasswordProtected(ctx, "assessment", args.id),
    }
  },
})

export const get = query({
  args: { id: v.id("assessments") },
  handler: async (ctx, args) => {
    if (!(await canAccessAssessment(ctx, args.id))) return null
    return ctx.db.get(args.id)
  },
})

export const create = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    description: v.string(),
    type: v.union(v.literal("quiz"), v.literal("assignment"), v.literal("test")),
    questions: v.array(questionValidator),
    timeLimit: v.optional(v.number()),
    dueDate: v.optional(v.string()),
    leaderboardEnabled: v.boolean(),
    password: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    const { password, ...assessment } = args
    const id = await ctx.db.insert("assessments", {
      ...assessment,
      leaderboardEnabled: assessment.type === "quiz" && assessment.leaderboardEnabled,
      createdAt: new Date().toISOString(),
    })
    await configureResourcePassword(ctx, "assessment", id, password, false)
    return id
  },
})

export const update = mutation({
  args: {
    id: v.id("assessments"),
    title: v.string(),
    description: v.string(),
    type: v.union(v.literal("quiz"), v.literal("assignment"), v.literal("test")),
    questions: v.array(questionValidator),
    timeLimit: v.optional(v.number()),
    dueDate: v.optional(v.string()),
    leaderboardEnabled: v.boolean(),
    password: v.optional(v.string()),
    removePassword: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    const { id, password, removePassword, ...rest } = args
    await ctx.db.patch(id, {
      ...rest,
      leaderboardEnabled: rest.type === "quiz" && rest.leaderboardEnabled,
    })
    await configureResourcePassword(ctx, "assessment", id, password, removePassword)
  },
})

export const remove = mutation({
  args: { id: v.id("assessments") },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    await removeResourceAccess(ctx, "assessment", args.id)
    await ctx.db.delete(args.id)
  },
})
