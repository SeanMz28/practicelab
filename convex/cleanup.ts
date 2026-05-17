import { mutation } from "./_generated/server"

// One-off: removes pre-storage file submissions and legacy resources rows
// that still carry the old `fileUrl` shape. Delete this file after running.
export const purgeLegacyFiles = mutation({
  args: {},
  handler: async (ctx) => {
    const attempts = await ctx.db.query("assessmentAttempts").collect()
    for (const a of attempts) {
      const hasLegacyFile = a.answers.some(
        (ans) =>
          ans.type === "file" &&
          ans.value &&
          typeof ans.value === "object" &&
          !("storageId" in (ans.value as object)),
      )
      if (hasLegacyFile) await ctx.db.delete(a._id)
    }

    const resources = await ctx.db.query("resources").collect()
    for (const r of resources) {
      if (!("storageId" in r)) await ctx.db.delete(r._id)
    }
  },
})
