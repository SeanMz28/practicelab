import { ConvexError, v } from "convex/values"
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
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique()
    return {
      id: user._id as string,
      name: profile?.username ?? user.name,
      email: user.email,
    }
  },
})

export const listByIds = query({
  args: { ids: v.array(v.string()) },
  handler: async (ctx, args): Promise<PublicUser[]> => {
    const unique = Array.from(new Set(args.ids))
    const users = await Promise.all(
      unique.map(async (id) => {
        const [user, profile] = await Promise.all([
          authComponent.getAnyUserById(ctx, id),
          ctx.db
            .query("userProfiles")
            .withIndex("by_userId", (q) => q.eq("userId", id))
            .unique(),
        ])
        return user ? { user, profile } : null
      }),
    )
    return users
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
      .map(({ user, profile }) => ({
        id: user._id as string,
        name: profile?.username ?? user.name,
        email: user.email,
      }))
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

export const setUsername = mutation({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const authUser = await authComponent.getAuthUser(ctx)
    if (!authUser) throw new ConvexError("You must be signed in to choose a username.")

    const username = args.username.trim()
    if (!/^[A-Za-z0-9_]{3,24}$/.test(username)) {
      throw new ConvexError("Use 3–24 letters, numbers, or underscores.")
    }

    const usernameNormalized = username.toLocaleLowerCase("en")
    const claimed = await ctx.db
      .query("userProfiles")
      .withIndex("by_usernameNormalized", (q) =>
        q.eq("usernameNormalized", usernameNormalized),
      )
      .unique()

    if (claimed && claimed.userId !== authUser._id) {
      throw new ConvexError("That username is already taken.")
    }

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", authUser._id))
      .unique()

    if (profile) {
      await ctx.db.patch(profile._id, { username, usernameNormalized })
    } else {
      await ctx.db.insert("userProfiles", {
        userId: authUser._id,
        role: "student",
        username,
        usernameNormalized,
      })
    }

    return username
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
      username: profile?.username ?? null,
      email: authUser.email,
      image: authUser.image ?? null,
      role: profile?.role ?? "student",
    }
  },
})
