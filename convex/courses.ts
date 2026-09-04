import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireTutor } from "./users"
import {
  configureResourcePassword,
  isResourcePasswordProtected,
  removeResourceAccess,
} from "./access"

async function withPasswordStatus<T extends { _id: string }>(
  ctx: Parameters<typeof isResourcePasswordProtected>[0],
  course: T,
) {
  return {
    ...course,
    passwordProtected: await isResourcePasswordProtected(ctx, "course", course._id),
  }
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const courses = await ctx.db.query("courses").collect()
    return Promise.all(courses.map((course) => withPasswordStatus(ctx, course)))
  },
})

export const get = query({
  args: { id: v.id("courses") },
  handler: async (ctx, args) => {
    const course = await ctx.db.get(args.id)
    return course ? withPasswordStatus(ctx, course) : null
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    code: v.string(),
    description: v.string(),
    color: v.string(),
    password: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    const { password, ...course } = args
    const id = await ctx.db.insert("courses", course)
    await configureResourcePassword(ctx, "course", id, password, false)
    return id
  },
})

export const update = mutation({
  args: {
    id: v.id("courses"),
    name: v.string(),
    code: v.string(),
    description: v.string(),
    color: v.string(),
    password: v.optional(v.string()),
    removePassword: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    const { id, password, removePassword, ...rest } = args
    await ctx.db.patch(id, rest)
    await configureResourcePassword(ctx, "course", id, password, removePassword)
  },
})

export const remove = mutation({
  args: { id: v.id("courses") },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    await removeResourceAccess(ctx, "course", args.id)
    await ctx.db.delete(args.id)
  },
})
