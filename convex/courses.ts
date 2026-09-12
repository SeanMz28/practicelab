import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { isTutor, requireTutor } from "./users"
import {
  configureResourcePassword,
  getResourceAccessStatus,
  isResourcePasswordProtected,
  removeResourceAccess,
} from "./access"

async function withPasswordStatus<T extends { _id: string }>(
  ctx: Parameters<typeof isResourcePasswordProtected>[0],
  course: T,
) {
  return {
    ...course,
    locked: "locked" in course ? Boolean(course.locked) : false,
    hidden: "hidden" in course ? Boolean(course.hidden) : false,
    passwordProtected: await isResourcePasswordProtected(ctx, "course", course._id),
  }
}

async function withStudentAccess<T extends { _id: string; locked?: boolean; hidden?: boolean }>(
  ctx: Parameters<typeof getResourceAccessStatus>[0],
  course: T,
) {
  const access = await getResourceAccessStatus(ctx, "course", course._id)
  return {
    ...course,
    locked: course.locked ?? false,
    hidden: course.hidden ?? false,
    passwordProtected: access.passwordProtected,
    passwordLocked: !access.unlocked,
  }
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const courses = await ctx.db.query("courses").collect()
    return Promise.all(
      courses
        .filter((course) => !course.hidden)
        .map((course) => withStudentAccess(ctx, course)),
    )
  },
})

export const listForTutor = query({
  args: {},
  handler: async (ctx) => {
    await requireTutor(ctx)
    const courses = await ctx.db.query("courses").collect()
    return Promise.all(courses.map((course) => withPasswordStatus(ctx, course)))
  },
})

export const get = query({
  args: { id: v.id("courses") },
  handler: async (ctx, args) => {
    const course = await ctx.db.get(args.id)
    if (!course || (course.hidden && !(await isTutor(ctx)))) return null
    return withStudentAccess(ctx, course)
  },
})

export const getForTutor = query({
  args: { id: v.id("courses") },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
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
    locked: v.boolean(),
    hidden: v.boolean(),
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
    locked: v.boolean(),
    hidden: v.boolean(),
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
