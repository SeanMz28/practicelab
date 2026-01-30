import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ============================================
// QUERIES
// ============================================

// Get user by email
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Get user by ID
export const getById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

// Get all students
export const getAllStudents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "student"))
      .collect();
  },
});

// Get all tutors
export const getAllTutors = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "tutor"))
      .collect();
  },
});

// ============================================
// MUTATIONS
// ============================================

// Create a new user
export const create = mutation({
  args: {
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    role: v.union(v.literal("student"), v.literal("tutor"), v.literal("admin")),
    profileImage: v.optional(v.string()),
    studentId: v.optional(v.string()),
    department: v.optional(v.string()),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    
    const userId = await ctx.db.insert("users", {
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      role: args.role,
      profileImage: args.profileImage,
      studentId: args.studentId,
      department: args.department,
      title: args.title,
      isActive: true,
      enrollmentDate: args.role === "student" ? now : undefined,
      createdAt: now,
      updatedAt: now,
    });
    
    // If student, create initial stats record
    if (args.role === "student") {
      await ctx.db.insert("studentStats", {
        userId,
        totalCoursesEnrolled: 0,
        totalCoursesCompleted: 0,
        totalAssessmentsCompleted: 0,
        totalNotesViewed: 0,
        totalTimeSpent: 0,
        averageScore: 0,
        highestScore: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastActivityAt: now,
        updatedAt: now,
      });
    }
    
    return userId;
  },
});

// Update user profile
export const updateProfile = mutation({
  args: {
    userId: v.id("users"),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    profileImage: v.optional(v.string()),
    department: v.optional(v.string()),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    // Filter out undefined values
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );
    
    await ctx.db.patch(userId, {
      ...filteredUpdates,
      updatedAt: Date.now(),
    });
    
    return userId;
  },
});

// Update last login
export const updateLastLogin = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      lastLogin: Date.now(),
    });
  },
});

// Deactivate user
export const deactivate = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      isActive: false,
      updatedAt: Date.now(),
    });
  },
});
