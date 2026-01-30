import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ============================================
// QUERIES
// ============================================

// Get notes for a course
export const getByCourse = query({
  args: { 
    courseId: v.id("courses"),
    includeUnpublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let notesQuery = ctx.db
      .query("notes")
      .withIndex("by_courseId_order", (q) => q.eq("courseId", args.courseId));
    
    if (!args.includeUnpublished) {
      notesQuery = notesQuery.filter((q) => 
        q.and(
          q.eq(q.field("isPublished"), true),
          q.eq(q.field("isVisibleToStudents"), true)
        )
      );
    }
    
    return await notesQuery.collect();
  },
});

// Get note by ID
export const getById = query({
  args: { noteId: v.id("notes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.noteId);
  },
});

// Get note with view count
export const getWithViewCount = query({
  args: { noteId: v.id("notes") },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);
    if (!note) return null;
    
    const views = await ctx.db
      .query("noteViews")
      .withIndex("by_noteId", (q) => q.eq("noteId", args.noteId))
      .collect();
    
    // Count unique viewers
    const uniqueViewers = new Set(views.map(v => v.userId)).size;
    
    return {
      ...note,
      totalViews: views.length,
      uniqueViewers,
    };
  },
});

// ============================================
// MUTATIONS
// ============================================

// Create a new note
export const create = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    content: v.string(),
    order: v.number(),
    createdBy: v.id("users"),
    publishAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    return await ctx.db.insert("notes", {
      courseId: args.courseId,
      title: args.title,
      content: args.content,
      order: args.order,
      createdBy: args.createdBy,
      isPublished: false,
      isVisibleToStudents: false,
      publishAt: args.publishAt,
      expiresAt: args.expiresAt,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update note content
export const update = mutation({
  args: {
    noteId: v.id("notes"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    order: v.optional(v.number()),
    publishAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { noteId, ...updates } = args;
    
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );
    
    await ctx.db.patch(noteId, {
      ...filteredUpdates,
      updatedAt: Date.now(),
    });
    
    return noteId;
  },
});

// Publish/unpublish note
export const setVisibility = mutation({
  args: {
    noteId: v.id("notes"),
    isPublished: v.boolean(),
    isVisibleToStudents: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.noteId, {
      isPublished: args.isPublished,
      isVisibleToStudents: args.isVisibleToStudents,
      updatedAt: Date.now(),
    });
  },
});

// Delete note
export const remove = mutation({
  args: { noteId: v.id("notes") },
  handler: async (ctx, args) => {
    // Delete all views for this note
    const views = await ctx.db
      .query("noteViews")
      .withIndex("by_noteId", (q) => q.eq("noteId", args.noteId))
      .collect();
    
    for (const view of views) {
      await ctx.db.delete(view._id);
    }
    
    await ctx.db.delete(args.noteId);
  },
});

// Record note view
export const recordView = mutation({
  args: {
    noteId: v.id("notes"),
    userId: v.id("users"),
    duration: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    await ctx.db.insert("noteViews", {
      noteId: args.noteId,
      userId: args.userId,
      viewedAt: now,
      duration: args.duration,
    });
    
    // Update student stats
    const stats = await ctx.db
      .query("studentStats")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
    
    if (stats) {
      await ctx.db.patch(stats._id, {
        totalNotesViewed: stats.totalNotesViewed + 1,
        lastActivityAt: now,
        updatedAt: now,
      });
    }
    
    // Update content analytics
    const note = await ctx.db.get(args.noteId);
    if (note) {
      const analytics = await ctx.db
        .query("contentAnalytics")
        .withIndex("by_contentId", (q) => q.eq("contentId", args.noteId))
        .first();
      
      if (analytics) {
        // Check if this is a unique viewer
        const previousView = await ctx.db
          .query("noteViews")
          .withIndex("by_noteId_userId", (q) => 
            q.eq("noteId", args.noteId).eq("userId", args.userId)
          )
          .first();
        
        await ctx.db.patch(analytics._id, {
          totalViews: analytics.totalViews + 1,
          uniqueViewers: previousView ? analytics.uniqueViewers : analytics.uniqueViewers + 1,
          updatedAt: now,
        });
      } else {
        await ctx.db.insert("contentAnalytics", {
          contentType: "note",
          contentId: args.noteId,
          courseId: note.courseId,
          totalViews: 1,
          uniqueViewers: 1,
          totalCompletions: 0,
          updatedAt: now,
        });
      }
    }
  },
});
