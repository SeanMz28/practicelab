import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { authComponent } from "./auth"
import { requireTutor } from "./users"
import { canAccessAssessment } from "./access"

const fileSubmissionValidator = v.object({
  fileName: v.string(),
  fileType: v.string(),
  fileSize: v.number(),
  storageId: v.id("_storage"),
  uploadedAt: v.string(),
})

const answerValidator = v.object({
  questionId: v.string(),
  type: v.union(
    v.literal("multiple-choice"),
    v.literal("text"),
    v.literal("file"),
    v.literal("ordered-list"),
    v.literal("memory-verse"),
  ),
  value: v.union(v.number(), v.string(), v.array(v.string()), fileSubmissionValidator),
  isCorrect: v.optional(v.boolean()),
  pointsAwarded: v.optional(v.number()),
  feedback: v.optional(v.string()),
})

function normalizeAssessmentText(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("en")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireTutor(ctx)
    return ctx.db.query("assessmentAttempts").collect()
  },
})

export const listForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx)
    if (!authUser) return []
    return ctx.db
      .query("assessmentAttempts")
      .withIndex("by_userId", (q) => q.eq("userId", authUser._id))
      .collect()
  },
})

export const listByStatus = query({
  args: {
    status: v.union(v.literal("submitted"), v.literal("graded"), v.literal("pending")),
  },
  handler: async (ctx, args) => {
    await requireTutor(ctx)
    return ctx.db
      .query("assessmentAttempts")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect()
  },
})

export const get = query({
  args: { id: v.id("assessmentAttempts") },
  handler: async (ctx, args) => {
    const authUser = await authComponent.safeGetAuthUser(ctx)
    if (!authUser) return null
    const attempt = await ctx.db.get(args.id)
    if (!attempt) return null
    if (attempt.userId === authUser._id) return attempt

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", authUser._id))
      .unique()
    return profile?.role === "tutor" ? attempt : null
  },
})

export const submit = mutation({
  args: {
    assessmentId: v.id("assessments"),
    answers: v.array(answerValidator),
    startedAt: v.string(),
  },
  handler: async (ctx, args) => {
    const authUser = await authComponent.getAuthUser(ctx)
    if (!authUser) throw new Error("Not authenticated")
    if (!(await canAccessAssessment(ctx, args.assessmentId))) {
      throw new Error("Unlock this assessment before submitting")
    }
    const assessment = await ctx.db.get(args.assessmentId)
    if (!assessment) throw new Error("Assessment not found")

    const answers = assessment.questions.map((question) => {
      const submitted = args.answers.find((answer) => answer.questionId === question.id)
      if (question.type === "multiple-choice") {
        const numericValue =
          submitted?.type === "multiple-choice" && typeof submitted.value === "number"
            ? submitted.value
            : -1
        const isCorrect = numericValue === question.correctAnswer
        return {
          questionId: question.id,
          type: question.type,
          value: numericValue,
          isCorrect,
          pointsAwarded: isCorrect ? question.points : 0,
        }
      }
      if (question.type === "memory-verse") {
        const value =
          submitted?.type === "memory-verse" && typeof submitted.value === "string"
            ? submitted.value
            : ""
        const expected = normalizeAssessmentText(question.correctText ?? "")
        const isCorrect = expected.length > 0 && normalizeAssessmentText(value) === expected
        return {
          questionId: question.id,
          type: question.type,
          value,
          isCorrect,
          pointsAwarded: isCorrect ? question.points : 0,
        }
      }
      if (question.type === "ordered-list") {
        const value =
          submitted?.type === "ordered-list" && Array.isArray(submitted.value)
            ? submitted.value
            : []
        const expected = question.correctAnswers ?? []
        const correctCount = expected.reduce(
          (count, answer, index) =>
            normalizeAssessmentText(value[index] ?? "") === normalizeAssessmentText(answer)
              ? count + 1
              : count,
          0,
        )
        const isCorrect = expected.length > 0 && correctCount === expected.length
        return {
          questionId: question.id,
          type: question.type,
          value,
          isCorrect,
          pointsAwarded:
            expected.length === 0
              ? 0
              : Math.round((correctCount / expected.length) * question.points * 100) / 100,
        }
      }
      if (question.type === "text") {
        return {
          questionId: question.id,
          type: question.type,
          value:
            submitted?.type === "text" && typeof submitted.value === "string"
              ? submitted.value
              : "",
        }
      }
      return {
        questionId: question.id,
        type: question.type,
        value:
          submitted?.type === "file" &&
          typeof submitted.value === "object" &&
          submitted.value !== null &&
          !Array.isArray(submitted.value) &&
          "storageId" in submitted.value
            ? submitted.value
            : "",
      }
    })

    const hasManualGrading = assessment.questions.some(
      (question) => question.type === "text" || question.type === "file",
    )
    const totalPoints = assessment.questions.reduce((sum, question) => sum + question.points, 0)
    const earnedPoints = answers.reduce(
      (sum, answer) => sum + ("pointsAwarded" in answer ? (answer.pointsAwarded ?? 0) : 0),
      0,
    )

    return ctx.db.insert("assessmentAttempts", {
      assessmentId: args.assessmentId,
      answers,
      userId: authUser._id,
      score: hasManualGrading
        ? null
        : Math.round((earnedPoints / Math.max(totalPoints, 1)) * 100),
      totalQuestions: assessment.questions.length,
      startedAt: args.startedAt,
      completedAt: new Date().toISOString(),
      status: hasManualGrading ? "pending" : "graded",
    })
  },
})

export const leaderboard = query({
  args: {
    assessmentId: v.id("assessments"),
    mode: v.union(v.literal("latest"), v.literal("first")),
  },
  handler: async (ctx, args) => {
    const authUser = await authComponent.safeGetAuthUser(ctx)
    if (!authUser) return []
    const assessment = await ctx.db.get(args.assessmentId)
    if (
      !assessment ||
      assessment.type !== "quiz" ||
      !assessment.leaderboardEnabled ||
      !(await canAccessAssessment(ctx, args.assessmentId))
    ) {
      return []
    }

    const attempts = await ctx.db
      .query("assessmentAttempts")
      .withIndex("by_assessmentId", (q) => q.eq("assessmentId", args.assessmentId))
      .collect()
    const byUser = new Map<string, (typeof attempts)[number][]>()
    for (const attempt of attempts) {
      const existing = byUser.get(attempt.userId) ?? []
      existing.push(attempt)
      byUser.set(attempt.userId, existing)
    }

    const selected = Array.from(byUser.entries()).map(([userId, userAttempts]) => {
      const chronological = userAttempts.sort((a, b) => a._creationTime - b._creationTime)
      return {
        userId,
        attempt: args.mode === "first" ? chronological[0] : chronological.at(-1)!,
        attemptNumber: args.mode === "first" ? 1 : chronological.length,
      }
    })
    const enriched = await Promise.all(
      selected.map(async ({ userId, attempt, attemptNumber }) => {
        const [user, profile] = await Promise.all([
          authComponent.getAnyUserById(ctx, userId),
          ctx.db
            .query("userProfiles")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .unique(),
        ])
        return {
          name: profile?.username || user?.name || "Student",
          score: attempt.score,
          status: attempt.status,
          completedAt: attempt.completedAt,
          attemptNumber,
          isCurrentUser: userId === authUser._id,
        }
      }),
    )

    enriched.sort((a, b) => {
      if (a.score === null && b.score === null) return a.completedAt.localeCompare(b.completedAt)
      if (a.score === null) return 1
      if (b.score === null) return -1
      return b.score - a.score || a.completedAt.localeCompare(b.completedAt)
    })

    let previousScore: number | null | undefined
    let previousRank = 0
    return enriched.map((entry, index) => {
      const rank = entry.score !== null && entry.score === previousScore ? previousRank : index + 1
      previousScore = entry.score
      previousRank = rank
      return { ...entry, rank }
    })
  },
})

export const grade = mutation({
  args: {
    id: v.id("assessmentAttempts"),
    answers: v.array(answerValidator),
    score: v.number(),
  },
  handler: async (ctx, args) => {
    const authUser = await requireTutor(ctx)
    await ctx.db.patch(args.id, {
      answers: args.answers,
      score: args.score,
      status: "graded",
      gradedAt: new Date().toISOString(),
      gradedBy: authUser._id,
    })
  },
})
