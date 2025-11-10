import { createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(async ({ ctx }) => {
    const workflows = await prisma.workflow.findMany();
    return workflows;
  }),
  createWorkflow: protectedProcedure.mutation(() => {
    return prisma.workflow.create({
      data: {
        name: "test workflow",
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
