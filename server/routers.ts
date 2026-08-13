import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { civicResourceInput, civicResourceStatusInput } from "./contentValidation";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  content: router({
    listPublished: publicProcedure.query(async () => {
      try {
        return await db.listPublishedCivicResources();
      } catch (error) {
        console.error("[Content] Published-resource query unavailable:", error);
        // The source-first public site remains readable while a managed DB endpoint recovers.
        return [];
      }
    }),
    adminList: adminProcedure.query(() => db.listAllCivicResources()),
    create: adminProcedure.input(civicResourceInput).mutation(({ ctx, input }) =>
      db.createCivicResource(input, ctx.user.id),
    ),
    setStatus: adminProcedure.input(civicResourceStatusInput).mutation(({ input }) =>
      db.setCivicResourceStatus(input.id, input.status),
    ),
  }),
});

export type AppRouter = typeof appRouter;
