import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { authComponent } from "./auth"
import { canAccessFileResource } from "./access"

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.getAuthUser(ctx)
    if (!authUser) throw new Error("Not authenticated")
    return ctx.storage.generateUploadUrl()
  },
})

export const getUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const resource = await ctx.db
      .query("resources")
      .withIndex("by_storageId", (q) => q.eq("storageId", args.storageId))
      .unique()
    if (resource && !(await canAccessFileResource(ctx, resource._id))) return null
    return ctx.storage.getUrl(args.storageId)
  },
})
