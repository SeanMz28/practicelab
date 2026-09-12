import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireTutor } from "./users"
import {
  canAccessCourse,
  canAccessNote,
  configureResourcePassword,
  getResourceAccessStatus,
  isResourcePasswordProtected,
  removeResourceAccess,
} from "./access"

export const listByCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    if (!(await canAccessCourse(ctx, args.courseId))) return []
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect()
    return Promise.all(
      notes.map(async (note) => {
        const access = await getResourceAccessStatus(ctx, "note", note._id)
        const locked = note.locked ?? false
        return {
          ...note,
          locked,
          content: !locked && access.unlocked ? note.content : "",
          passwordProtected: access.passwordProtected,
          passwordLocked: !access.unlocked,
        }
      }),
    )
  },
})

export const listByCourseForTutor = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect()
    return Promise.all(
      notes.map(async (note) => ({
        ...note,
        passwordProtected: await isResourcePasswordProtected(ctx, "note", note._id),
      })),
    )
  },
})

export const getMetadata = query({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.id)
    if (!note || !(await canAccessCourse(ctx, note.courseId))) return null
    return {
      _id: note._id,
      _creationTime: note._creationTime,
      courseId: note.courseId,
      title: note.title,
      locked: note.locked ?? false,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      passwordProtected: await isResourcePasswordProtected(ctx, "note", note._id),
    }
  },
})

export const get = query({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.id)
    if (!note || !(await canAccessNote(ctx, args.id))) return null
    return note
  },
})

export const create = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    content: v.string(),
    locked: v.boolean(),
    password: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    const { password, ...note } = args
    const now = new Date().toISOString()
    const id = await ctx.db.insert("notes", { ...note, createdAt: now, updatedAt: now })
    await configureResourcePassword(ctx, "note", id, password, false)
    return id
  },
})

export const update = mutation({
  args: {
    id: v.id("notes"),
    title: v.string(),
    content: v.string(),
    locked: v.boolean(),
    password: v.optional(v.string()),
    removePassword: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    const { id, password, removePassword, ...note } = args
    await ctx.db.patch(id, {
      ...note,
      updatedAt: new Date().toISOString(),
    })
    await configureResourcePassword(ctx, "note", id, password, removePassword)
  },
})

export const remove = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    await removeResourceAccess(ctx, "note", args.id)
    await ctx.db.delete(args.id)
  },
})
