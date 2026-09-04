import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireTutor } from "./users"
import { canAccessCourse } from "./access"

export const listByCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    if (!(await canAccessCourse(ctx, args.courseId))) return []
    return ctx.db
      .query("notes")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect()
  },
})

export const get = query({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.id)
    if (!note || !(await canAccessCourse(ctx, note.courseId))) return null
    return note
  },
})

export const create = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    const now = new Date().toISOString()
    return ctx.db.insert("notes", { ...args, createdAt: now, updatedAt: now })
  },
})

export const update = mutation({
  args: {
    id: v.id("notes"),
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    await ctx.db.patch(args.id, {
      title: args.title,
      content: args.content,
      updatedAt: new Date().toISOString(),
    })
  },
})

export const remove = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    await ctx.db.delete(args.id)
  },
})
