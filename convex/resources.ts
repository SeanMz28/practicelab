import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireTutor } from "./users"
import {
  canAccessCourse,
  canAccessFileResource,
  configureResourcePassword,
  getResourceAccessStatus,
  isResourcePasswordProtected,
  removeResourceAccess,
} from "./access"

export const listByCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    if (!(await canAccessCourse(ctx, args.courseId))) return []
    const resources = await ctx.db
      .query("resources")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect()
    return Promise.all(
      resources.map(async (resource) => {
        const access = await getResourceAccessStatus(ctx, "resource", resource._id)
        const locked = resource.locked ?? false
        return {
          ...resource,
          locked,
          storageId: !locked && access.unlocked ? resource.storageId : null,
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
    const resources = await ctx.db
      .query("resources")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect()
    return Promise.all(
      resources.map(async (resource) => ({
        ...resource,
        passwordProtected: await isResourcePasswordProtected(ctx, "resource", resource._id),
      })),
    )
  },
})

export const getDownloadUrl = query({
  args: { id: v.id("resources") },
  handler: async (ctx, args) => {
    if (!(await canAccessFileResource(ctx, args.id))) return null
    const resource = await ctx.db.get(args.id)
    return resource ? ctx.storage.getUrl(resource.storageId) : null
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
    locked: v.boolean(),
    password: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    const { password, ...resource } = args
    const id = await ctx.db.insert("resources", {
      ...resource,
      uploadedAt: new Date().toISOString(),
    })
    await configureResourcePassword(ctx, "resource", id, password, false)
    return id
  },
})

export const updateAccess = mutation({
  args: {
    id: v.id("resources"),
    locked: v.boolean(),
    password: v.optional(v.string()),
    removePassword: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    const resource = await ctx.db.get(args.id)
    if (!resource) throw new Error("Resource not found")
    await ctx.db.patch(args.id, { locked: args.locked })
    await configureResourcePassword(ctx, "resource", args.id, args.password, args.removePassword)
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
    await removeResourceAccess(ctx, "resource", args.id)
    await ctx.db.delete(args.id)
  },
})
