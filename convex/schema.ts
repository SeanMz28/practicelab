import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ============================================
  // USERS & AUTHENTICATION
  // ============================================
  users: defineTable({
    // Profile information
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    profileImage: v.optional(v.string()),
    role: v.union(v.literal("student"), v.literal("tutor"), v.literal("admin")),
    
    // Student-specific fields
    studentId: v.optional(v.string()),
    enrollmentDate: v.optional(v.number()),
    
    // Tutor-specific fields
    department: v.optional(v.string()),
    title: v.optional(v.string()),
    
    // Account status
    isActive: v.boolean(),
    lastLogin: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"])
    .index("by_studentId", ["studentId"]),

  // ============================================
  // COURSES
  // ============================================
  courses: defineTable({
    code: v.string(), // e.g., "CS101"
    name: v.string(),
    description: v.string(),
    coverImage: v.optional(v.string()),
    
    // Course settings
    isPublished: v.boolean(),
    isArchived: v.boolean(),
    
    // Ownership
    createdBy: v.id("users"), // Tutor who created
    
    // Timestamps
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_code", ["code"])
    .index("by_createdBy", ["createdBy"])
    .index("by_isPublished", ["isPublished"]),

  // Student enrollment in courses
  enrollments: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    
    // Progress tracking
    progress: v.number(), // 0-100 percentage
    
    // Enrollment status
    status: v.union(
      v.literal("active"),
      v.literal("completed"),
      v.literal("dropped"),
      v.literal("pending")
    ),
    
    enrolledAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_userId", ["userId"])
    .index("by_courseId", ["courseId"])
    .index("by_userId_courseId", ["userId", "courseId"]),

  // ============================================
  // NOTES (Markdown Content)
  // ============================================
  notes: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    content: v.string(), // Markdown content
    order: v.number(), // Display order within course
    
    // Visibility & Access
    isPublished: v.boolean(),
    isVisibleToStudents: v.boolean(),
    
    // Scheduling
    publishAt: v.optional(v.number()), // Schedule future publishing
    expiresAt: v.optional(v.number()), // Auto-hide after date
    
    // Metadata
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_courseId", ["courseId"])
    .index("by_courseId_order", ["courseId", "order"])
    .index("by_isPublished", ["isPublished"]),

  // Track note views
  noteViews: defineTable({
    noteId: v.id("notes"),
    userId: v.id("users"),
    viewedAt: v.number(),
    duration: v.optional(v.number()), // Time spent in seconds
  })
    .index("by_noteId", ["noteId"])
    .index("by_userId", ["userId"])
    .index("by_noteId_userId", ["noteId", "userId"]),

  // ============================================
  // ASSESSMENTS (Quizzes, Tests, Assignments)
  // ============================================
  assessments: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    description: v.optional(v.string()),
    type: v.union(
      v.literal("quiz"),
      v.literal("test"),
      v.literal("assignment"),
      v.literal("exam")
    ),
    
    // Settings
    totalPoints: v.number(),
    passingScore: v.optional(v.number()),
    timeLimit: v.optional(v.number()), // In minutes
    maxAttempts: v.optional(v.number()), // null = unlimited
    shuffleQuestions: v.boolean(),
    showCorrectAnswers: v.boolean(), // After submission
    
    // Visibility & Access
    isPublished: v.boolean(),
    isVisibleToStudents: v.boolean(),
    
    // Scheduling
    availableFrom: v.optional(v.number()),
    availableUntil: v.optional(v.number()),
    
    // Metadata
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_courseId", ["courseId"])
    .index("by_type", ["type"])
    .index("by_isPublished", ["isPublished"]),

  // Questions within assessments
  questions: defineTable({
    assessmentId: v.id("assessments"),
    type: v.union(
      v.literal("multiple_choice"),
      v.literal("written"),
      v.literal("file_upload"),
      v.literal("true_false"),
      v.literal("short_answer")
    ),
    
    // Question content
    question: v.string(),
    explanation: v.optional(v.string()), // Shown after grading
    points: v.number(),
    order: v.number(),
    
    // For multiple choice / true-false
    options: v.optional(v.array(v.object({
      id: v.string(),
      text: v.string(),
      isCorrect: v.boolean(),
    }))),
    
    // For written/short answer - expected answer hints for tutors
    rubric: v.optional(v.string()),
    
    // For file upload
    allowedFileTypes: v.optional(v.array(v.string())), // e.g., [".py", ".java"]
    maxFileSize: v.optional(v.number()), // In bytes
    
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_assessmentId", ["assessmentId"])
    .index("by_assessmentId_order", ["assessmentId", "order"]),

  // ============================================
  // STUDENT ATTEMPTS & SUBMISSIONS
  // ============================================
  assessmentAttempts: defineTable({
    assessmentId: v.id("assessments"),
    userId: v.id("users"),
    attemptNumber: v.number(),
    
    // Timing
    startedAt: v.number(),
    submittedAt: v.optional(v.number()),
    
    // Status
    status: v.union(
      v.literal("in_progress"),
      v.literal("submitted"),
      v.literal("grading"),
      v.literal("graded")
    ),
    
    // Results
    totalScore: v.optional(v.number()),
    percentage: v.optional(v.number()),
    isPassed: v.optional(v.boolean()),
    
    // Grading info
    gradedBy: v.optional(v.id("users")),
    gradedAt: v.optional(v.number()),
    feedback: v.optional(v.string()), // Overall feedback
  })
    .index("by_assessmentId", ["assessmentId"])
    .index("by_userId", ["userId"])
    .index("by_assessmentId_userId", ["assessmentId", "userId"])
    .index("by_status", ["status"]),

  // Individual question responses
  questionResponses: defineTable({
    attemptId: v.id("assessmentAttempts"),
    questionId: v.id("questions"),
    
    // Response content
    selectedOptionId: v.optional(v.string()), // For multiple choice
    textResponse: v.optional(v.string()), // For written answers
    fileId: v.optional(v.id("files")), // For file uploads
    
    // Auto-grading (for multiple choice)
    isAutoGraded: v.boolean(),
    isCorrect: v.optional(v.boolean()),
    
    // Manual grading
    pointsAwarded: v.optional(v.number()),
    feedback: v.optional(v.string()),
    gradedBy: v.optional(v.id("users")),
    gradedAt: v.optional(v.number()),
    
    answeredAt: v.number(),
  })
    .index("by_attemptId", ["attemptId"])
    .index("by_questionId", ["questionId"]),

  // ============================================
  // FILES & RESOURCES
  // ============================================
  files: defineTable({
    name: v.string(),
    storageId: v.string(), // Convex storage ID
    mimeType: v.string(),
    size: v.number(), // In bytes
    
    // Context - where this file belongs
    context: v.union(
      v.literal("resource"), // Course resource
      v.literal("submission"), // Student submission
      v.literal("note_attachment"), // Attached to a note
      v.literal("profile") // Profile picture
    ),
    
    // References (optional, depending on context)
    courseId: v.optional(v.id("courses")),
    noteId: v.optional(v.id("notes")),
    assessmentId: v.optional(v.id("assessments")),
    
    uploadedBy: v.id("users"),
    uploadedAt: v.number(),
  })
    .index("by_courseId", ["courseId"])
    .index("by_context", ["context"])
    .index("by_uploadedBy", ["uploadedBy"]),

  // Course resources (PDFs, videos, links, etc.)
  resources: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    description: v.optional(v.string()),
    type: v.union(
      v.literal("file"),
      v.literal("link"),
      v.literal("video"),
      v.literal("document")
    ),
    
    // Content
    fileId: v.optional(v.id("files")), // For uploaded files
    url: v.optional(v.string()), // For external links/videos
    
    // Organization
    category: v.optional(v.string()), // e.g., "Lecture Slides", "Reading Materials"
    order: v.number(),
    
    // Visibility & Access
    isPublished: v.boolean(),
    isVisibleToStudents: v.boolean(),
    
    // Scheduling
    availableFrom: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
    
    // Metadata
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_courseId", ["courseId"])
    .index("by_courseId_category", ["courseId", "category"])
    .index("by_isPublished", ["isPublished"]),

  // Track resource downloads/views
  resourceAccess: defineTable({
    resourceId: v.id("resources"),
    userId: v.id("users"),
    accessedAt: v.number(),
    action: v.union(v.literal("view"), v.literal("download")),
  })
    .index("by_resourceId", ["resourceId"])
    .index("by_userId", ["userId"]),

  // ============================================
  // GRADES & PROGRESS
  // ============================================
  grades: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    assessmentId: v.id("assessments"),
    attemptId: v.id("assessmentAttempts"),
    
    // Grade info
    score: v.number(),
    maxScore: v.number(),
    percentage: v.number(),
    letterGrade: v.optional(v.string()), // A, B, C, etc.
    
    // This is the "final" grade for this assessment
    isFinal: v.boolean(),
    
    recordedAt: v.number(),
    recordedBy: v.optional(v.id("users")), // Tutor who finalized
  })
    .index("by_userId", ["userId"])
    .index("by_courseId", ["courseId"])
    .index("by_assessmentId", ["assessmentId"])
    .index("by_userId_courseId", ["userId", "courseId"]),

  // Overall course grades (aggregated)
  courseGrades: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    
    // Aggregated scores
    totalPoints: v.number(),
    earnedPoints: v.number(),
    percentage: v.number(),
    letterGrade: v.optional(v.string()),
    
    // Status
    status: v.union(
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("failed")
    ),
    
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_courseId", ["courseId"])
    .index("by_userId_courseId", ["userId", "courseId"]),

  // ============================================
  // STUDENT STATS & ANALYTICS
  // ============================================
  studentStats: defineTable({
    userId: v.id("users"),
    
    // Overall stats
    totalCoursesEnrolled: v.number(),
    totalCoursesCompleted: v.number(),
    totalAssessmentsCompleted: v.number(),
    totalNotesViewed: v.number(),
    totalTimeSpent: v.number(), // In seconds
    
    // Performance
    averageScore: v.number(),
    highestScore: v.number(),
    
    // Streaks & Activity
    currentStreak: v.number(), // Days in a row
    longestStreak: v.number(),
    lastActivityAt: v.number(),
    
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"]),

  // ============================================
  // CONTENT ANALYTICS (for tutors)
  // ============================================
  contentAnalytics: defineTable({
    contentType: v.union(
      v.literal("note"),
      v.literal("assessment"),
      v.literal("resource")
    ),
    contentId: v.string(), // ID of the content
    courseId: v.id("courses"),
    
    // View/completion stats
    totalViews: v.number(),
    uniqueViewers: v.number(),
    totalCompletions: v.number(), // For assessments
    
    // For assessments
    averageScore: v.optional(v.number()),
    passRate: v.optional(v.number()),
    averageTimeSpent: v.optional(v.number()),
    
    updatedAt: v.number(),
  })
    .index("by_contentType", ["contentType"])
    .index("by_courseId", ["courseId"])
    .index("by_contentId", ["contentId"]),
});
