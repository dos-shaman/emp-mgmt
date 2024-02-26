import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const idSchema = z.object({ id: z.string() });

const userSchema = z.object({
  rollno: z.bigint(),
  name: z.string().max(30),
  email: z.string(),
  department: z.string(),
  dateOfBirth: z.date(),
  gpa: z.number().max(99999999),
});

const userUpdateSchema = z.object({
  id: z.string(),
  rollno: z.bigint(),
  name: z.string(),
  email: z.string(),
  department: z.string(),
  dateOfBirth: z.date(),
  gpa: z.number().max(8),
});

export const exampleRouter = createTRPCRouter({
  //get all users
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  //get user by id
  getOne: publicProcedure
    .input(idSchema)
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: { id: Number(idSchema.parse(input).id) },
      });
    }),

  //create user
  createUser: publicProcedure
    .input(userSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.create({
        data: userSchema.parse(input),
      });
    }),

  //update user
  updateUser: publicProcedure
    .input(userUpdateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: {
          id: Number(input.id),
        },
        data: {
          ...userUpdateSchema.parse(input),
          id: Number(input.id),
        },
      });
    }),

  //delete user
  deleteUser: publicProcedure
    .input(idSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.delete({
        where: { id: Number(idSchema.parse(input).id) },
      });
    }),
});
