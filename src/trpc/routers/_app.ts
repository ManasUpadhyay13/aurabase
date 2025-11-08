import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(() => {
      return {
        greeting: `hello world`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
