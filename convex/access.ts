import { hashPassword, verifyPassword } from "better-auth/crypto"
import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import type { MutationCtx, QueryCtx } from "./_generated/server"
import type { Id } from "./_generated/dataModel"
import { authComponent } from "./auth"

export type ProtectedResourceType = "course" | "assessment" | "note" | "resource"
type ReadCtx = QueryCtx | MutationCtx

const protectedResourceTypeValidator = v.union(
  v.literal("course"),
  v.literal("assessment"),
  v.literal("note"),
  v.literal("resource"),
)

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

async function requesterIsTutor(ctx: ReadCtx) {
  const authUser = await authComponent.safeGetAuthUser(ctx)
  return authUser ? userIsTutor(ctx, authUser._id) : false
}

async function userHasGrant(
  ctx: ReadCtx,
  userId: string,
  resourceType: ProtectedResourceType,
  resourceId: string,
  credentialId: Id<"accessCredentials">,
) {
  const grants = await ctx.db
    .query("accessGrants")
    .withIndex("by_user_resource", (q) =>
      q
        .eq("userId", userId)
        .eq("resourceType", resourceType)
        .eq("resourceId", resourceId),
    )
    .collect()

  return grants.some((grant) => grant.credentialId === credentialId)
}

export async function isResourcePasswordProtected(
  ctx: ReadCtx,
  resourceType: ProtectedResourceType,
  resourceId: string,
) {
  return (await getCredential(ctx, resourceType, resourceId)) !== null
}

export async function getResourceAccessStatus(
  ctx: ReadCtx,
  resourceType: ProtectedResourceType,
  resourceId: string,
) {
  const credential = await getCredential(ctx, resourceType, resourceId)
  if (!credential) return { passwordProtected: false, unlocked: true }

  const authUser = await authComponent.safeGetAuthUser(ctx)
  return {
    passwordProtected: true,
    unlocked:
      authUser != null &&
      (await userHasGrant(ctx, authUser._id, resourceType, resourceId, credential._id)),
  }
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

  return userHasGrant(ctx, authUser._id, resourceType, resourceId, credential._id)
}

export async function canAccessCourse(ctx: ReadCtx, courseId: string) {
  const courseIdValue = ctx.db.normalizeId("courses", courseId)
  if (!courseIdValue) return false
  const course = await ctx.db.get(courseIdValue)
  if (!course) return false
  if ((course.locked || course.hidden) && !(await requesterIsTutor(ctx))) return false

  return canAccessResource(ctx, "course", courseId)
}

export async function canAccessAssessment(ctx: ReadCtx, assessmentId: string) {
  const assessmentIdValue = ctx.db.normalizeId("assessments", assessmentId)
  if (!assessmentIdValue) return false
  const assessment = await ctx.db.get(assessmentIdValue)
  if (!assessment) return false
  if (assessment.locked && !(await requesterIsTutor(ctx))) return false

  return (
    (await canAccessCourse(ctx, assessment.courseId)) &&
    (await canAccessResource(ctx, "assessment", assessmentId))
  )
}

export async function canAccessNote(ctx: ReadCtx, noteId: string) {
  const noteIdValue = ctx.db.normalizeId("notes", noteId)
  if (!noteIdValue) return false
  const note = await ctx.db.get(noteIdValue)
  if (!note) return false
  if (note.locked && !(await requesterIsTutor(ctx))) return false

  return (
    (await canAccessCourse(ctx, note.courseId)) &&
    (await canAccessResource(ctx, "note", noteId))
  )
}

export async function canAccessFileResource(ctx: ReadCtx, resourceId: string) {
  const resourceIdValue = ctx.db.normalizeId("resources", resourceId)
  if (!resourceIdValue) return false
  const resource = await ctx.db.get(resourceIdValue)
  if (!resource) return false
  if (resource.locked && !(await requesterIsTutor(ctx))) return false

  return (
    (await canAccessCourse(ctx, resource.courseId)) &&
    (await canAccessResource(ctx, "resource", resourceId))
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
    resourceType: protectedResourceTypeValidator,
    resourceId: v.string(),
  },
  handler: async (ctx, args) => getResourceAccessStatus(ctx, args.resourceType, args.resourceId),
})

export const unlock = mutation({
  args: {
    resourceType: protectedResourceTypeValidator,
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
