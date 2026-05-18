import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import type { QueryCtx, MutationCtx } from "./_generated/server"
import { authComponent } from "./auth"

type PublicUser = { id: string; name: string; email: string }

export async function requireTutor(ctx: QueryCtx | MutationCtx) {
  const authUser = await authComponent.getAuthUser(ctx)
  if (!authUser) throw new Error("Not authenticated")

  const profile = await ctx.db
    .query("userProfiles")
    .withIndex("by_userId", (q) => q.eq("userId", authUser._id))
    .unique()

  if (profile?.role !== "tutor") throw new Error("Tutor role required")
  return authUser
}

export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, args): Promise<PublicUser | null> => {
    const user = await authComponent.getAnyUserById(ctx, args.id)
    if (!user) return null
    return { id: user._id as string, name: user.name, email: user.email }
  },
})

export const listByIds = query({
  args: { ids: v.array(v.string()) },
  handler: async (ctx, args): Promise<PublicUser[]> => {
    const unique = Array.from(new Set(args.ids))
    const users = await Promise.all(
      unique.map((id) => authComponent.getAnyUserById(ctx, id)),
    )
    return users
      .filter((u): u is NonNullable<typeof u> => u !== null)
      .map((u) => ({ id: u._id as string, name: u.name, email: u.email }))
  },
})

export const ensureProfile = mutation({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx)
    if (!authUser) return null

    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", authUser._id))
      .unique()

    if (existing) return existing._id
    return ctx.db.insert("userProfiles", { userId: authUser._id, role: "student" })
  },
})

export const me = query({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx)
    if (!authUser) return null

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", authUser._id))
      .unique()

    return {
      id: authUser._id,
      name: authUser.name,
      email: authUser.email,
      image: authUser.image ?? null,
      role: profile?.role ?? "student",
    }
  },
})
