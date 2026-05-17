import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { authComponent } from "./auth"

const fileSubmissionValidator = v.object({
  fileName: v.string(),
  fileType: v.string(),
  fileSize: v.number(),
  storageId: v.id("_storage"),
  uploadedAt: v.string(),
})

const answerValidator = v.object({
  questionId: v.string(),
  type: v.union(v.literal("multiple-choice"), v.literal("text"), v.literal("file")),
  value: v.union(v.number(), v.string(), fileSubmissionValidator),
  isCorrect: v.optional(v.boolean()),
  pointsAwarded: v.optional(v.number()),
  feedback: v.optional(v.string()),
})

export const list = query({
  args: {},
  handler: async (ctx) => ctx.db.query("assessmentAttempts").collect(),
})

export const listForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx)
    if (!authUser) return []
    return ctx.db
      .query("assessmentAttempts")
      .withIndex("by_userId", (q) => q.eq("userId", authUser._id))
      .collect()
  },
})

export const listByStatus = query({
  args: {
    status: v.union(v.literal("submitted"), v.literal("graded"), v.literal("pending")),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("assessmentAttempts")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect()
  },
})

export const get = query({
  args: { id: v.id("assessmentAttempts") },
  handler: async (ctx, args) => ctx.db.get(args.id),
})

export const submit = mutation({
  args: {
    assessmentId: v.id("assessments"),
    answers: v.array(answerValidator),
    score: v.union(v.number(), v.null()),
    totalQuestions: v.number(),
    startedAt: v.string(),
    completedAt: v.string(),
    status: v.union(v.literal("submitted"), v.literal("graded"), v.literal("pending")),
  },
  handler: async (ctx, args) => {
    const authUser = await authComponent.getAuthUser(ctx)
    if (!authUser) throw new Error("Not authenticated")
    return ctx.db.insert("assessmentAttempts", {
      ...args,
      userId: authUser._id,
    })
  },
})

export const grade = mutation({
  args: {
    id: v.id("assessmentAttempts"),
    answers: v.array(answerValidator),
    score: v.number(),
  },
  handler: async (ctx, args) => {
    const authUser = await authComponent.getAuthUser(ctx)
    if (!authUser) throw new Error("Not authenticated")
    await ctx.db.patch(args.id, {
      answers: args.answers,
      score: args.score,
      status: "graded",
      gradedAt: new Date().toISOString(),
      gradedBy: authUser._id,
    })
  },
})
