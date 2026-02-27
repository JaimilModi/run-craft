import { query } from "./_generated/server";

export const getContributionCalendar = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const userId = identity.subject;

    const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000;

    const executions = await ctx.db
      .query("codeExecutions")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.gte(q.field("_creationTime"), oneYearAgo),
        ),
      )
      .collect();

    const snippets = await ctx.db
      .query("snippets")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.gte(q.field("_creationTime"), oneYearAgo),
        ),
      )
      .collect();

    const comments = await ctx.db
      .query("snippetComments")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.gte(q.field("_creationTime"), oneYearAgo),
        ),
      )
      .collect();

    const stars = await ctx.db
      .query("stars")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.gte(q.field("_creationTime"), oneYearAgo),
        ),
      )
      .collect();

    const allActivities = [...executions, ...snippets, ...comments, ...stars];

    const map = new Map<string, number>();

    allActivities.forEach((item) => {
      const date = new Date(item._creationTime).toISOString().split("T")[0];

      map.set(date, (map.get(date) ?? 0) + 1);
    });

    return Array.from(map.entries()).map(([date, count]) => ({
      date,
      count,
    }));
  },
});
