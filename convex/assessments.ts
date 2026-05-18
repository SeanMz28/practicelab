import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireTutor } from "./users"

const questionValidator = v.object({
  id: v.string(),
  type: v.union(v.literal("multiple-choice"), v.literal("text"), v.literal("file")),
  question: v.string(),
  points: v.number(),
  options: v.optional(v.array(v.string())),
  correctAnswer: v.optional(v.number()),
  explanation: v.optional(v.string()),
  acceptedFileTypes: v.optional(v.array(v.string())),
})

export const list = query({
  args: {},
  handler: async (ctx) => ctx.db.query("assessments").collect(),
})

export const listByCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    return ctx.db
      .query("assessments")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect()
  },
})

export const get = query({
  args: { id: v.id("assessments") },
  handler: async (ctx, args) => ctx.db.get(args.id),
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
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    return ctx.db.insert("assessments", {
      ...args,
      createdAt: new Date().toISOString(),
    })
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
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    const { id, ...rest } = args
    await ctx.db.patch(id, rest)
  },
})

export const remove = mutation({
  args: { id: v.id("assessments") },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    await ctx.db.delete(args.id)
  },
})
