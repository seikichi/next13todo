import z from "zod";

export const Task = z
  .object({
    id: z.number().positive(),
    title: z.string().min(1),
    completed: z.boolean(),
  })
  .brand<"Task">();

export type Task = z.infer<typeof Task>;

export const NewTask = z
  .object({ title: z.string().min(1) })
  .brand<"NewTask">();

export type NewTask = z.infer<typeof NewTask>;
