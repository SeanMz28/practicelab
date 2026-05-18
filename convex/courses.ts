import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireTutor } from "./users"

export const list = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("courses").collect()
  },
})

export const get = query({
  args: { id: v.id("courses") },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id)
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    code: v.string(),
    description: v.string(),
    color: v.string(),
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    return ctx.db.insert("courses", args)
  },
})

export const update = mutation({
  args: {
    id: v.id("courses"),
    name: v.string(),
    code: v.string(),
    description: v.string(),
    color: v.string(),
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    const { id, ...rest } = args
    await ctx.db.patch(id, rest)
  },
})

export const remove = mutation({
  args: { id: v.id("courses") },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    await ctx.db.delete(args.id)
  },
})
