import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ============================================
// ASSESSMENT QUERIES
// ============================================

// Get assessments for a course
export const getByCourse = query({
  args: {
    courseId: v.id("courses"),
    includeUnpublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let assessmentsQuery = ctx.db
      .query("assessments")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId));

    if (!args.includeUnpublished) {
      assessmentsQuery = assessmentsQuery.filter((q) =>
        q.and(
          q.eq(q.field("isPublished"), true),
          q.eq(q.field("isVisibleToStudents"), true)
        )
      );
    }

    return await assessmentsQuery.collect();
  },
});

// Get assessment by ID with questions
export const getWithQuestions = query({
  args: { assessmentId: v.id("assessments") },
  handler: async (ctx, args) => {
    const assessment = await ctx.db.get(args.assessmentId);
    if (!assessment) return null;

    const questions = await ctx.db
      .query("questions")
      .withIndex("by_assessmentId_order", (q) =>
        q.eq("assessmentId", args.assessmentId)
      )
      .collect();

    return { ...assessment, questions };
  },
});

// Get assessment stats (for tutors)
export const getStats = query({
  args: { assessmentId: v.id("assessments") },
  handler: async (ctx, args) => {
    const attempts = await ctx.db
      .query("assessmentAttempts")
      .withIndex("by_assessmentId", (q) => q.eq("assessmentId", args.assessmentId))
      .collect();

    const gradedAttempts = attempts.filter((a) => a.status === "graded");
    const scores = gradedAttempts.map((a) => a.percentage || 0);
    const assessment = await ctx.db.get(args.assessmentId);

    return {
      totalAttempts: attempts.length,
      completedAttempts: gradedAttempts.length,
      pendingGrading: attempts.filter((a) => a.status === "submitted").length,
      averageScore: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
      highestScore: scores.length > 0 ? Math.max(...scores) : 0,
      lowestScore: scores.length > 0 ? Math.min(...scores) : 0,
      passRate: gradedAttempts.length > 0
        ? (gradedAttempts.filter((a) => a.isPassed).length / gradedAttempts.length) * 100
        : 0,
      passingScore: assessment?.passingScore,
    };
  },
});

// ============================================
// ASSESSMENT MUTATIONS
// ============================================

// Create a new assessment
export const create = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    description: v.optional(v.string()),
    type: v.union(
      v.literal("quiz"),
      v.literal("test"),
      v.literal("assignment"),
      v.literal("exam")
    ),
    totalPoints: v.number(),
    passingScore: v.optional(v.number()),
    timeLimit: v.optional(v.number()),
    maxAttempts: v.optional(v.number()),
    shuffleQuestions: v.boolean(),
    showCorrectAnswers: v.boolean(),
    availableFrom: v.optional(v.number()),
    availableUntil: v.optional(v.number()),
    createdBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    return await ctx.db.insert("assessments", {
      ...args,
      isPublished: false,
      isVisibleToStudents: false,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update assessment
export const update = mutation({
  args: {
    assessmentId: v.id("assessments"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    totalPoints: v.optional(v.number()),
    passingScore: v.optional(v.number()),
    timeLimit: v.optional(v.number()),
    maxAttempts: v.optional(v.number()),
    shuffleQuestions: v.optional(v.boolean()),
    showCorrectAnswers: v.optional(v.boolean()),
    availableFrom: v.optional(v.number()),
    availableUntil: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { assessmentId, ...updates } = args;

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );

    await ctx.db.patch(assessmentId, {
      ...filteredUpdates,
      updatedAt: Date.now(),
    });

    return assessmentId;
  },
});

// Publish/unpublish assessment
export const setVisibility = mutation({
  args: {
    assessmentId: v.id("assessments"),
    isPublished: v.boolean(),
    isVisibleToStudents: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.assessmentId, {
      isPublished: args.isPublished,
      isVisibleToStudents: args.isVisibleToStudents,
      updatedAt: Date.now(),
    });
  },
});

// ============================================
// QUESTION MUTATIONS
// ============================================

// Add question to assessment
export const addQuestion = mutation({
  args: {
    assessmentId: v.id("assessments"),
    type: v.union(
      v.literal("multiple_choice"),
      v.literal("written"),
      v.literal("file_upload"),
      v.literal("true_false"),
      v.literal("short_answer")
    ),
    question: v.string(),
    explanation: v.optional(v.string()),
    points: v.number(),
    order: v.number(),
    options: v.optional(
      v.array(
        v.object({
          id: v.string(),
          text: v.string(),
          isCorrect: v.boolean(),
        })
      )
    ),
    rubric: v.optional(v.string()),
    allowedFileTypes: v.optional(v.array(v.string())),
    maxFileSize: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    return await ctx.db.insert("questions", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update question
export const updateQuestion = mutation({
  args: {
    questionId: v.id("questions"),
    question: v.optional(v.string()),
    explanation: v.optional(v.string()),
    points: v.optional(v.number()),
    order: v.optional(v.number()),
    options: v.optional(
      v.array(
        v.object({
          id: v.string(),
          text: v.string(),
          isCorrect: v.boolean(),
        })
      )
    ),
    rubric: v.optional(v.string()),
    allowedFileTypes: v.optional(v.array(v.string())),
    maxFileSize: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { questionId, ...updates } = args;

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );

    await ctx.db.patch(questionId, {
      ...filteredUpdates,
      updatedAt: Date.now(),
    });

    return questionId;
  },
});

// Delete question
export const deleteQuestion = mutation({
  args: { questionId: v.id("questions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.questionId);
  },
});

// ============================================
// ATTEMPT & SUBMISSION
// ============================================

// Start an assessment attempt
export const startAttempt = mutation({
  args: {
    assessmentId: v.id("assessments"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const assessment = await ctx.db.get(args.assessmentId);
    if (!assessment) throw new Error("Assessment not found");

    // Check max attempts
    if (assessment.maxAttempts) {
      const existingAttempts = await ctx.db
        .query("assessmentAttempts")
        .withIndex("by_assessmentId_userId", (q) =>
          q.eq("assessmentId", args.assessmentId).eq("userId", args.userId)
        )
        .collect();

      if (existingAttempts.length >= assessment.maxAttempts) {
        throw new Error("Maximum attempts reached");
      }
    }

    // Get current attempt number
    const attempts = await ctx.db
      .query("assessmentAttempts")
      .withIndex("by_assessmentId_userId", (q) =>
        q.eq("assessmentId", args.assessmentId).eq("userId", args.userId)
      )
      .collect();

    return await ctx.db.insert("assessmentAttempts", {
      assessmentId: args.assessmentId,
      userId: args.userId,
      attemptNumber: attempts.length + 1,
      startedAt: Date.now(),
      status: "in_progress",
    });
  },
});

// Submit a response to a question
export const submitResponse = mutation({
  args: {
    attemptId: v.id("assessmentAttempts"),
    questionId: v.id("questions"),
    selectedOptionId: v.optional(v.string()),
    textResponse: v.optional(v.string()),
    fileId: v.optional(v.id("files")),
  },
  handler: async (ctx, args) => {
    const question = await ctx.db.get(args.questionId);
    if (!question) throw new Error("Question not found");

    const now = Date.now();

    // Auto-grade multiple choice and true/false
    let isAutoGraded = false;
    let isCorrect: boolean | undefined;
    let pointsAwarded: number | undefined;

    if (
      (question.type === "multiple_choice" || question.type === "true_false") &&
      args.selectedOptionId &&
      question.options
    ) {
      isAutoGraded = true;
      const selectedOption = question.options.find(
        (o) => o.id === args.selectedOptionId
      );
      isCorrect = selectedOption?.isCorrect || false;
      pointsAwarded = isCorrect ? question.points : 0;
    }

    return await ctx.db.insert("questionResponses", {
      attemptId: args.attemptId,
      questionId: args.questionId,
      selectedOptionId: args.selectedOptionId,
      textResponse: args.textResponse,
      fileId: args.fileId,
      isAutoGraded,
      isCorrect,
      pointsAwarded,
      answeredAt: now,
    });
  },
});

// Submit the entire assessment
export const submitAttempt = mutation({
  args: { attemptId: v.id("assessmentAttempts") },
  handler: async (ctx, args) => {
    const attempt = await ctx.db.get(args.attemptId);
    if (!attempt) throw new Error("Attempt not found");

    const assessment = await ctx.db.get(attempt.assessmentId);
    if (!assessment) throw new Error("Assessment not found");

    // Get all responses for this attempt
    const responses = await ctx.db
      .query("questionResponses")
      .withIndex("by_attemptId", (q) => q.eq("attemptId", args.attemptId))
      .collect();

    // Check if all questions need manual grading
    const needsManualGrading = responses.some((r) => !r.isAutoGraded);

    // Calculate auto-graded score
    const autoGradedScore = responses
      .filter((r) => r.isAutoGraded)
      .reduce((sum, r) => sum + (r.pointsAwarded || 0), 0);

    const now = Date.now();

    if (needsManualGrading) {
      // Set to submitted for manual grading
      await ctx.db.patch(args.attemptId, {
        submittedAt: now,
        status: "submitted",
      });
    } else {
      // All auto-graded, calculate final score
      const percentage = (autoGradedScore / assessment.totalPoints) * 100;
      const isPassed = assessment.passingScore
        ? percentage >= assessment.passingScore
        : true;

      await ctx.db.patch(args.attemptId, {
        submittedAt: now,
        status: "graded",
        totalScore: autoGradedScore,
        percentage,
        isPassed,
        gradedAt: now,
      });

      // Record grade
      await ctx.db.insert("grades", {
        userId: attempt.userId,
        courseId: assessment.courseId,
        assessmentId: assessment._id,
        attemptId: args.attemptId,
        score: autoGradedScore,
        maxScore: assessment.totalPoints,
        percentage,
        isFinal: true,
        recordedAt: now,
      });
    }

    return args.attemptId;
  },
});

// ============================================
// GRADING (for tutors)
// ============================================

// Get pending submissions for grading
export const getPendingGrading = query({
  args: { tutorId: v.optional(v.id("users")) },
  handler: async (ctx) => {
    const pendingAttempts = await ctx.db
      .query("assessmentAttempts")
      .withIndex("by_status", (q) => q.eq("status", "submitted"))
      .collect();

    // Get full details for each attempt
    const attemptsWithDetails = await Promise.all(
      pendingAttempts.map(async (attempt) => {
        const assessment = await ctx.db.get(attempt.assessmentId);
        const user = await ctx.db.get(attempt.userId);
        const course = assessment ? await ctx.db.get(assessment.courseId) : null;

        return {
          ...attempt,
          assessment,
          user,
          course,
        };
      })
    );

    return attemptsWithDetails;
  },
});

// Grade a response
export const gradeResponse = mutation({
  args: {
    responseId: v.id("questionResponses"),
    pointsAwarded: v.number(),
    feedback: v.optional(v.string()),
    gradedBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.responseId, {
      pointsAwarded: args.pointsAwarded,
      feedback: args.feedback,
      gradedBy: args.gradedBy,
      gradedAt: Date.now(),
    });
  },
});

// Finalize grading for an attempt
export const finalizeGrading = mutation({
  args: {
    attemptId: v.id("assessmentAttempts"),
    feedback: v.optional(v.string()),
    gradedBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    const attempt = await ctx.db.get(args.attemptId);
    if (!attempt) throw new Error("Attempt not found");

    const assessment = await ctx.db.get(attempt.assessmentId);
    if (!assessment) throw new Error("Assessment not found");

    // Get all responses and calculate total score
    const responses = await ctx.db
      .query("questionResponses")
      .withIndex("by_attemptId", (q) => q.eq("attemptId", args.attemptId))
      .collect();

    const totalScore = responses.reduce(
      (sum, r) => sum + (r.pointsAwarded || 0),
      0
    );
    const percentage = (totalScore / assessment.totalPoints) * 100;
    const isPassed = assessment.passingScore
      ? percentage >= assessment.passingScore
      : true;

    const now = Date.now();

    // Update attempt
    await ctx.db.patch(args.attemptId, {
      status: "graded",
      totalScore,
      percentage,
      isPassed,
      feedback: args.feedback,
      gradedBy: args.gradedBy,
      gradedAt: now,
    });

    // Record grade
    await ctx.db.insert("grades", {
      userId: attempt.userId,
      courseId: assessment.courseId,
      assessmentId: assessment._id,
      attemptId: args.attemptId,
      score: totalScore,
      maxScore: assessment.totalPoints,
      percentage,
      isFinal: true,
      recordedAt: now,
      recordedBy: args.gradedBy,
    });

    // Update student stats
    const stats = await ctx.db
      .query("studentStats")
      .withIndex("by_userId", (q) => q.eq("userId", attempt.userId))
      .first();

    if (stats) {
      const newTotal = stats.totalAssessmentsCompleted + 1;
      const newAverage =
        (stats.averageScore * stats.totalAssessmentsCompleted + percentage) /
        newTotal;

      await ctx.db.patch(stats._id, {
        totalAssessmentsCompleted: newTotal,
        averageScore: newAverage,
        highestScore: Math.max(stats.highestScore, percentage),
        updatedAt: now,
      });
    }

    return args.attemptId;
  },
});
