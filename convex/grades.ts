import { v } from "convex/values";
import { query } from "./_generated/server";

// ============================================
// GRADE QUERIES
// ============================================

// Get all grades for a student
export const getByStudent = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const grades = await ctx.db
      .query("grades")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    // Get full details for each grade
    const gradesWithDetails = await Promise.all(
      grades.map(async (grade) => {
        const assessment = await ctx.db.get(grade.assessmentId);
        const course = await ctx.db.get(grade.courseId);

        return {
          ...grade,
          assessment,
          course,
        };
      })
    );

    return gradesWithDetails;
  },
});

// Get grades for a student in a specific course
export const getByStudentAndCourse = query({
  args: {
    userId: v.id("users"),
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    const grades = await ctx.db
      .query("grades")
      .withIndex("by_userId_courseId", (q) =>
        q.eq("userId", args.userId).eq("courseId", args.courseId)
      )
      .collect();

    // Get assessment details
    const gradesWithAssessments = await Promise.all(
      grades.map(async (grade) => {
        const assessment = await ctx.db.get(grade.assessmentId);
        return { ...grade, assessment };
      })
    );

    return gradesWithAssessments;
  },
});

// Get course grade summary for a student
export const getCourseGradeSummary = query({
  args: {
    userId: v.id("users"),
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    // Get the course grade record
    const courseGrade = await ctx.db
      .query("courseGrades")
      .withIndex("by_userId_courseId", (q) =>
        q.eq("userId", args.userId).eq("courseId", args.courseId)
      )
      .first();

    // Get all individual grades
    const grades = await ctx.db
      .query("grades")
      .withIndex("by_userId_courseId", (q) =>
        q.eq("userId", args.userId).eq("courseId", args.courseId)
      )
      .collect();

    // Calculate stats
    const totalGrades = grades.length;
    const totalPoints = grades.reduce((sum, g) => sum + g.maxScore, 0);
    const earnedPoints = grades.reduce((sum, g) => sum + g.score, 0);
    const averagePercentage = totalGrades > 0
      ? grades.reduce((sum, g) => sum + g.percentage, 0) / totalGrades
      : 0;

    return {
      courseGrade,
      stats: {
        totalGrades,
        totalPoints,
        earnedPoints,
        averagePercentage,
        highestGrade: totalGrades > 0 ? Math.max(...grades.map((g) => g.percentage)) : 0,
        lowestGrade: totalGrades > 0 ? Math.min(...grades.map((g) => g.percentage)) : 0,
      },
    };
  },
});

// Get all grades for an assessment (for tutors)
export const getByAssessment = query({
  args: { assessmentId: v.id("assessments") },
  handler: async (ctx, args) => {
    const grades = await ctx.db
      .query("grades")
      .withIndex("by_assessmentId", (q) => q.eq("assessmentId", args.assessmentId))
      .collect();

    // Get student details
    const gradesWithStudents = await Promise.all(
      grades.map(async (grade) => {
        const student = await ctx.db.get(grade.userId);
        return { ...grade, student };
      })
    );

    return gradesWithStudents;
  },
});

// ============================================
// STUDENT STATS QUERIES
// ============================================

// Get student stats
export const getStudentStats = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("studentStats")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
  },
});

// Get leaderboard (top students)
export const getLeaderboard = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const allStats = await ctx.db.query("studentStats").collect();

    // Sort by average score
    const sorted = allStats.sort((a, b) => b.averageScore - a.averageScore);
    const limited = args.limit ? sorted.slice(0, args.limit) : sorted;

    // Get user details
    const leaderboard = await Promise.all(
      limited.map(async (stats, index) => {
        const user = await ctx.db.get(stats.userId);
        return {
          rank: index + 1,
          user,
          stats,
        };
      })
    );

    return leaderboard;
  },
});

// ============================================
// CONTENT ANALYTICS QUERIES
// ============================================

// Get analytics for a course
export const getCourseAnalytics = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const analytics = await ctx.db
      .query("contentAnalytics")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect();

    // Group by content type
    const noteAnalytics = analytics.filter((a) => a.contentType === "note");
    const assessmentAnalytics = analytics.filter((a) => a.contentType === "assessment");
    const resourceAnalytics = analytics.filter((a) => a.contentType === "resource");

    // Calculate totals
    const totalNoteViews = noteAnalytics.reduce((sum, a) => sum + a.totalViews, 0);
    const totalAssessmentCompletions = assessmentAnalytics.reduce(
      (sum, a) => sum + a.totalCompletions,
      0
    );
    const averageAssessmentScore =
      assessmentAnalytics.length > 0
        ? assessmentAnalytics.reduce((sum, a) => sum + (a.averageScore || 0), 0) /
          assessmentAnalytics.length
        : 0;

    return {
      notes: {
        items: noteAnalytics,
        totalViews: totalNoteViews,
        uniqueViewers: noteAnalytics.reduce((sum, a) => sum + a.uniqueViewers, 0),
      },
      assessments: {
        items: assessmentAnalytics,
        totalCompletions: totalAssessmentCompletions,
        averageScore: averageAssessmentScore,
        averagePassRate:
          assessmentAnalytics.length > 0
            ? assessmentAnalytics.reduce((sum, a) => sum + (a.passRate || 0), 0) /
              assessmentAnalytics.length
            : 0,
      },
      resources: {
        items: resourceAnalytics,
        totalViews: resourceAnalytics.reduce((sum, a) => sum + a.totalViews, 0),
      },
    };
  },
});
