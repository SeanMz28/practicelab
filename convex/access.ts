import { hashPassword, verifyPassword } from "better-auth/crypto"
import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import type { MutationCtx, QueryCtx } from "./_generated/server"
import { authComponent } from "./auth"

export type ProtectedResourceType = "course" | "assessment"
type ReadCtx = QueryCtx | MutationCtx

async function getCredential(
  ctx: ReadCtx,
  resourceType: ProtectedResourceType,
  resourceId: string,
) {
  return ctx.db
    .query("accessCredentials")
    .withIndex("by_resource", (q) =>
      q.eq("resourceType", resourceType).eq("resourceId", resourceId),
    )
    .unique()
}

async function userIsTutor(ctx: ReadCtx, userId: string) {
  const profile = await ctx.db
    .query("userProfiles")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .unique()
  return profile?.role === "tutor"
}

export async function isResourcePasswordProtected(
  ctx: ReadCtx,
  resourceType: ProtectedResourceType,
  resourceId: string,
) {
  return (await getCredential(ctx, resourceType, resourceId)) !== null
}

export async function canAccessResource(
  ctx: ReadCtx,
  resourceType: ProtectedResourceType,
  resourceId: string,
) {
  const credential = await getCredential(ctx, resourceType, resourceId)
  if (!credential) return true

  const authUser = await authComponent.safeGetAuthUser(ctx)
  if (!authUser) return false
  if (await userIsTutor(ctx, authUser._id)) return true

  const grants = await ctx.db
    .query("accessGrants")
    .withIndex("by_user_resource", (q) =>
      q
        .eq("userId", authUser._id)
        .eq("resourceType", resourceType)
        .eq("resourceId", resourceId),
    )
    .collect()

  return grants.some((grant) => grant.credentialId === credential._id)
}

export async function canAccessCourse(ctx: ReadCtx, courseId: string) {
  return canAccessResource(ctx, "course", courseId)
}

export async function canAccessAssessment(ctx: ReadCtx, assessmentId: string) {
  const assessmentIdValue = ctx.db.normalizeId("assessments", assessmentId)
  if (!assessmentIdValue) return false
  const assessment = await ctx.db.get(assessmentIdValue)
  if (!assessment) return false

  return (
    (await canAccessCourse(ctx, assessment.courseId)) &&
    (await canAccessResource(ctx, "assessment", assessmentId))
  )
}

async function deleteResourceAccess(
  ctx: MutationCtx,
  resourceType: ProtectedResourceType,
  resourceId: string,
) {
  const credentials = await ctx.db
    .query("accessCredentials")
    .withIndex("by_resource", (q) =>
      q.eq("resourceType", resourceType).eq("resourceId", resourceId),
    )
    .collect()
  const grants = await ctx.db
    .query("accessGrants")
    .withIndex("by_resource", (q) =>
      q.eq("resourceType", resourceType).eq("resourceId", resourceId),
    )
    .collect()

  await Promise.all([
    ...credentials.map((credential) => ctx.db.delete(credential._id)),
    ...grants.map((grant) => ctx.db.delete(grant._id)),
  ])
}

export async function configureResourcePassword(
  ctx: MutationCtx,
  resourceType: ProtectedResourceType,
  resourceId: string,
  password: string | undefined,
  removePassword: boolean | undefined,
) {
  if (removePassword) {
    await deleteResourceAccess(ctx, resourceType, resourceId)
    return
  }
  if (password === undefined || password === "") return
  if (password.length < 4) throw new Error("Passwords must be at least 4 characters")
  if (password.length > 128) throw new Error("Passwords must be 128 characters or fewer")

  const passwordHash = await hashPassword(password)
  await deleteResourceAccess(ctx, resourceType, resourceId)
  await ctx.db.insert("accessCredentials", { resourceType, resourceId, passwordHash })
}

export async function removeResourceAccess(
  ctx: MutationCtx,
  resourceType: ProtectedResourceType,
  resourceId: string,
) {
  await deleteResourceAccess(ctx, resourceType, resourceId)
}

export const status = query({
  args: {
    resourceType: v.union(v.literal("course"), v.literal("assessment")),
    resourceId: v.string(),
  },
  handler: async (ctx, args) => {
    const protectedResource = await isResourcePasswordProtected(
      ctx,
      args.resourceType,
      args.resourceId,
    )
    return {
      passwordProtected: protectedResource,
      unlocked: await canAccessResource(ctx, args.resourceType, args.resourceId),
    }
  },
})

export const unlock = mutation({
  args: {
    resourceType: v.union(v.literal("course"), v.literal("assessment")),
    resourceId: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const authUser = await authComponent.getAuthUser(ctx)
    if (!authUser) throw new Error("Sign in to unlock this content")

    const credential = await getCredential(ctx, args.resourceType, args.resourceId)
    if (!credential) return { unlocked: true }
    if (!(await verifyPassword({ hash: credential.passwordHash, password: args.password }))) {
      throw new Error("Incorrect password")
    }

    const existing = await ctx.db
      .query("accessGrants")
      .withIndex("by_user_resource", (q) =>
        q
          .eq("userId", authUser._id)
          .eq("resourceType", args.resourceType)
          .eq("resourceId", args.resourceId),
      )
      .collect()
    if (!existing.some((grant) => grant.credentialId === credential._id)) {
      await ctx.db.insert("accessGrants", {
        userId: authUser._id,
        resourceType: args.resourceType,
        resourceId: args.resourceId,
        credentialId: credential._id,
        grantedAt: new Date().toISOString(),
      })
    }
    return { unlocked: true }
  },
})
