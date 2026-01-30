import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ============================================
// QUERIES
// ============================================

// Get all published courses
export const getPublished = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_isPublished", (q) => q.eq("isPublished", true))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .collect();
  },
});

// Get course by ID
export const getById = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.courseId);
  },
});

// Get course by code
export const getByCode = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .first();
  },
});

// Get courses created by a tutor
export const getByTutor = query({
  args: { tutorId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_createdBy", (q) => q.eq("createdBy", args.tutorId))
      .collect();
  },
});

// Get courses a student is enrolled in
export const getEnrolledCourses = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const enrollments = await ctx.db
      .query("enrollments")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();
    
    const courses = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = await ctx.db.get(enrollment.courseId);
        return course ? { ...course, enrollment } : null;
      })
    );
    
    return courses.filter(Boolean);
  },
});

// ============================================
// MUTATIONS
// ============================================

// Create a new course
export const create = mutation({
  args: {
    code: v.string(),
    name: v.string(),
    description: v.string(),
    coverImage: v.optional(v.string()),
    createdBy: v.id("users"),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Check if course code already exists
    const existingCourse = await ctx.db
      .query("courses")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .first();
    
    if (existingCourse) {
      throw new Error("Course with this code already exists");
    }
    
    return await ctx.db.insert("courses", {
      code: args.code,
      name: args.name,
      description: args.description,
      coverImage: args.coverImage,
      createdBy: args.createdBy,
      isPublished: false,
      isArchived: false,
      startDate: args.startDate,
      endDate: args.endDate,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update course
export const update = mutation({
  args: {
    courseId: v.id("courses"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { courseId, ...updates } = args;
    
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );
    
    await ctx.db.patch(courseId, {
      ...filteredUpdates,
      updatedAt: Date.now(),
    });
    
    return courseId;
  },
});

// Publish/unpublish course
export const setPublished = mutation({
  args: {
    courseId: v.id("courses"),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.courseId, {
      isPublished: args.isPublished,
      updatedAt: Date.now(),
    });
  },
});

// Archive course
export const archive = mutation({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.courseId, {
      isArchived: true,
      updatedAt: Date.now(),
    });
  },
});

// Enroll student in course
export const enrollStudent = mutation({
  args: {
    userId: v.id("users"),
    courseId: v.id("courses"),
  },
  handler: async (ctx, args) => {
    // Check if already enrolled
    const existingEnrollment = await ctx.db
      .query("enrollments")
      .withIndex("by_userId_courseId", (q) =>
        q.eq("userId", args.userId).eq("courseId", args.courseId)
      )
      .first();
    
    if (existingEnrollment) {
      throw new Error("Student is already enrolled in this course");
    }
    
    const enrollmentId = await ctx.db.insert("enrollments", {
      userId: args.userId,
      courseId: args.courseId,
      progress: 0,
      status: "active",
      enrolledAt: Date.now(),
    });
    
    // Update student stats
    const stats = await ctx.db
      .query("studentStats")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
    
    if (stats) {
      await ctx.db.patch(stats._id, {
        totalCoursesEnrolled: stats.totalCoursesEnrolled + 1,
        updatedAt: Date.now(),
      });
    }
    
    return enrollmentId;
  },
});

// Update enrollment progress
export const updateProgress = mutation({
  args: {
    userId: v.id("users"),
    courseId: v.id("courses"),
    progress: v.number(),
  },
  handler: async (ctx, args) => {
    const enrollment = await ctx.db
      .query("enrollments")
      .withIndex("by_userId_courseId", (q) =>
        q.eq("userId", args.userId).eq("courseId", args.courseId)
      )
      .first();
    
    if (!enrollment) {
      throw new Error("Enrollment not found");
    }
    
    const updates: Record<string, unknown> = { progress: args.progress };
    
    // If progress is 100%, mark as completed
    if (args.progress >= 100 && enrollment.status !== "completed") {
      updates.status = "completed";
      updates.completedAt = Date.now();
      
      // Update student stats
      const stats = await ctx.db
        .query("studentStats")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .first();
      
      if (stats) {
        await ctx.db.patch(stats._id, {
          totalCoursesCompleted: stats.totalCoursesCompleted + 1,
          updatedAt: Date.now(),
        });
      }
    }
    
    await ctx.db.patch(enrollment._id, updates);
  },
});
