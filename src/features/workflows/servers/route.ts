import { generateSlug } from "random-word-slugs";
import prisma from "@/lib/db";
import {
  createTRPCRouter,
  preminumProcedure,
  protectedProcedure,
} from "@/trpc/init";
import z from "zod";

export const workflowsRouter = createTRPCRouter({
  create: protectedProcedure.mutation(({ ctx }) => {
    return prisma.workflow.create({
      data: {
        name: generateSlug(5),
        userId: ctx.session.user.id,
      },
    });
  }),
  // delete workflow route
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return prisma.workflow.delete({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),
  updateName: protectedProcedure
    .input(z.object({ name: z.string(), id: z.string().min(5) }))
    .mutation(({ ctx, input }) => {
      return prisma.workflow.update({
        data: {
          name: input.name,
        },
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),
  // get all workflows route
  getMany: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return prisma.workflow.findUnique({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),
});
