import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ============================================
// QUERIES
// ============================================

// Get resources for a course
export const getByCourse = query({
  args: {
    courseId: v.id("courses"),
    includeUnpublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let resourcesQuery = ctx.db
      .query("resources")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId));

    if (!args.includeUnpublished) {
      resourcesQuery = resourcesQuery.filter((q) =>
        q.and(
          q.eq(q.field("isPublished"), true),
          q.eq(q.field("isVisibleToStudents"), true)
        )
      );
    }

    const resources = await resourcesQuery.collect();

    // Get file info for each resource that has a file
    const resourcesWithFiles = await Promise.all(
      resources.map(async (resource) => {
        if (resource.fileId) {
          const file = await ctx.db.get(resource.fileId);
          return { ...resource, file };
        }
        return resource;
      })
    );

    return resourcesWithFiles;
  },
});

// Get resources by category
export const getByCategory = query({
  args: {
    courseId: v.id("courses"),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("resources")
      .withIndex("by_courseId_category", (q) =>
        q.eq("courseId", args.courseId).eq("category", args.category)
      )
      .filter((q) =>
        q.and(
          q.eq(q.field("isPublished"), true),
          q.eq(q.field("isVisibleToStudents"), true)
        )
      )
      .collect();
  },
});

// Get resource categories for a course
export const getCategories = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const resources = await ctx.db
      .query("resources")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect();

    const categories = [...new Set(resources.map((r) => r.category).filter(Boolean))];
    return categories as string[];
  },
});

// ============================================
// MUTATIONS
// ============================================

// Create a new resource
export const create = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    description: v.optional(v.string()),
    type: v.union(
      v.literal("file"),
      v.literal("link"),
      v.literal("video"),
      v.literal("document")
    ),
    fileId: v.optional(v.id("files")),
    url: v.optional(v.string()),
    category: v.optional(v.string()),
    order: v.number(),
    createdBy: v.id("users"),
    availableFrom: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    return await ctx.db.insert("resources", {
      ...args,
      isPublished: false,
      isVisibleToStudents: false,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update resource
export const update = mutation({
  args: {
    resourceId: v.id("resources"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    url: v.optional(v.string()),
    category: v.optional(v.string()),
    order: v.optional(v.number()),
    availableFrom: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { resourceId, ...updates } = args;

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );

    await ctx.db.patch(resourceId, {
      ...filteredUpdates,
      updatedAt: Date.now(),
    });

    return resourceId;
  },
});

// Set resource visibility
export const setVisibility = mutation({
  args: {
    resourceId: v.id("resources"),
    isPublished: v.boolean(),
    isVisibleToStudents: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.resourceId, {
      isPublished: args.isPublished,
      isVisibleToStudents: args.isVisibleToStudents,
      updatedAt: Date.now(),
    });
  },
});

// Delete resource
export const remove = mutation({
  args: { resourceId: v.id("resources") },
  handler: async (ctx, args) => {
    const resource = await ctx.db.get(args.resourceId);

    // Delete associated file if exists
    if (resource?.fileId) {
      await ctx.db.delete(resource.fileId);
    }

    // Delete access records
    const accessRecords = await ctx.db
      .query("resourceAccess")
      .withIndex("by_resourceId", (q) => q.eq("resourceId", args.resourceId))
      .collect();

    for (const record of accessRecords) {
      await ctx.db.delete(record._id);
    }

    await ctx.db.delete(args.resourceId);
  },
});

// Record resource access
export const recordAccess = mutation({
  args: {
    resourceId: v.id("resources"),
    userId: v.id("users"),
    action: v.union(v.literal("view"), v.literal("download")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("resourceAccess", {
      resourceId: args.resourceId,
      userId: args.userId,
      accessedAt: Date.now(),
      action: args.action,
    });
  },
});

// ============================================
// FILE MANAGEMENT
// ============================================

// Generate upload URL
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Save file metadata
export const saveFile = mutation({
  args: {
    name: v.string(),
    storageId: v.string(),
    mimeType: v.string(),
    size: v.number(),
    context: v.union(
      v.literal("resource"),
      v.literal("submission"),
      v.literal("note_attachment"),
      v.literal("profile")
    ),
    courseId: v.optional(v.id("courses")),
    noteId: v.optional(v.id("notes")),
    assessmentId: v.optional(v.id("assessments")),
    uploadedBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("files", {
      ...args,
      uploadedAt: Date.now(),
    });
  },
});

// Get file URL
export const getFileUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

// Delete file
export const deleteFile = mutation({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.fileId);
    if (file) {
      await ctx.storage.delete(file.storageId);
      await ctx.db.delete(args.fileId);
    }
  },
});
