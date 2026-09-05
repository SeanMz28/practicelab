import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

const question = v.object({
  id: v.string(),
  type: v.union(
    v.literal("multiple-choice"),
    v.literal("text"),
    v.literal("file"),
    v.literal("ordered-list"),
    v.literal("memory-verse"),
  ),
  question: v.string(),
  points: v.number(),
  options: v.optional(v.array(v.string())),
  correctAnswer: v.optional(v.number()),
  correctText: v.optional(v.string()),
  correctAnswers: v.optional(v.array(v.string())),
  explanation: v.optional(v.string()),
  acceptedFileTypes: v.optional(v.array(v.string())),
})

const fileSubmission = v.object({
  fileName: v.string(),
  fileType: v.string(),
  fileSize: v.number(),
  storageId: v.id("_storage"),
  uploadedAt: v.string(),
})

const answer = v.object({
  questionId: v.string(),
  type: v.union(
    v.literal("multiple-choice"),
    v.literal("text"),
    v.literal("file"),
    v.literal("ordered-list"),
    v.literal("memory-verse"),
  ),
  value: v.union(v.number(), v.string(), v.array(v.string()), fileSubmission),
  isCorrect: v.optional(v.boolean()),
  pointsAwarded: v.optional(v.number()),
  feedback: v.optional(v.string()),
})

export default defineSchema({
  userProfiles: defineTable({
    userId: v.string(),
    role: v.union(v.literal("student"), v.literal("tutor")),
    username: v.optional(v.string()),
    usernameNormalized: v.optional(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_usernameNormalized", ["usernameNormalized"]),

  courses: defineTable({
    name: v.string(),
    code: v.string(),
    description: v.string(),
    color: v.string(),
  }),

  notes: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    content: v.string(),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_courseId", ["courseId"]),

  assessments: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    description: v.string(),
    type: v.union(v.literal("quiz"), v.literal("assignment"), v.literal("test")),
    questions: v.array(question),
    timeLimit: v.optional(v.number()),
    dueDate: v.optional(v.string()),
    leaderboardEnabled: v.optional(v.boolean()),
    createdAt: v.string(),
  }).index("by_courseId", ["courseId"]),

  assessmentAttempts: defineTable({
    assessmentId: v.id("assessments"),
    userId: v.string(),
    answers: v.array(answer),
    score: v.union(v.number(), v.null()),
    totalQuestions: v.number(),
    startedAt: v.string(),
    completedAt: v.string(),
    gradedAt: v.optional(v.string()),
    gradedBy: v.optional(v.string()),
    status: v.union(v.literal("submitted"), v.literal("graded"), v.literal("pending")),
  })
    .index("by_userId", ["userId"])
    .index("by_assessmentId", ["assessmentId"])
    .index("by_assessment_user", ["assessmentId", "userId"])
    .index("by_status", ["status"]),

  accessCredentials: defineTable({
    resourceType: v.union(v.literal("course"), v.literal("assessment")),
    resourceId: v.string(),
    passwordHash: v.string(),
  }).index("by_resource", ["resourceType", "resourceId"]),

  accessGrants: defineTable({
    userId: v.string(),
    resourceType: v.union(v.literal("course"), v.literal("assessment")),
    resourceId: v.string(),
    credentialId: v.id("accessCredentials"),
    grantedAt: v.string(),
  })
    .index("by_user_resource", ["userId", "resourceType", "resourceId"])
    .index("by_resource", ["resourceType", "resourceId"]),

  resources: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    description: v.string(),
    fileName: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
    storageId: v.id("_storage"),
    uploadedAt: v.string(),
  }).index("by_courseId", ["courseId"]),
})
