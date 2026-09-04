import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireTutor } from "./users"
import { canAccessCourse } from "./access"

export const listByCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    if (!(await canAccessCourse(ctx, args.courseId))) return []
    return ctx.db
      .query("resources")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect()
  },
})

export const create = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    description: v.string(),
    fileName: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    return ctx.db.insert("resources", {
      ...args,
      uploadedAt: new Date().toISOString(),
    })
  },
})

export const remove = mutation({
  args: { id: v.id("resources") },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    const resource = await ctx.db.get(args.id)
    if (resource) {
      await ctx.storage.delete(resource.storageId)
    }
    await ctx.db.delete(args.id)
  },
})
