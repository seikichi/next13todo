"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import { NewTask, Task } from "./schema";
import { Result, err, ok } from "./result";
import logger from "./logger";

export async function addTask(
  task: NewTask
): Promise<Result<{}, { message: string }>> {
  logger.info({ message: "addTask", task });

  try {
    await prisma.task.create({ data: task });
  } catch (e) {
    revalidatePath("/");
    logger.error(e, "Failed to create new task");
    return err({ message: "Failed to create new task" });
  }
  revalidatePath("/");
  return ok({});
}

export async function deleteTask({
  id,
}: Pick<Task, "id">): Promise<Result<{}, { message: string }>> {
  logger.info({ message: "deleteTask", task: { id } });

  try {
    await prisma.task.delete({ where: { id } });
  } catch (e) {
    revalidatePath("/");
    logger.error(e, "Failed to delete task");
    return err({ message: "Failed to delete task" });
  }
  revalidatePath("/");
  return ok({});
}

export async function updateTask({
  id,
  completed,
}: Pick<Task, "id" | "completed">): Promise<Result<{}, { message: string }>> {
  logger.info({ message: "toggleTask", task: { id } });

  try {
    await prisma.task.update({ where: { id }, data: { completed } });
  } catch (e) {
    revalidatePath("/");
    logger.error(e, "Failed to toggle task");
    return err({ message: "Failed to toggle task" });
  }
  revalidatePath("/");
  return ok({});
}

export async function clearCompletedTasks(): Promise<
  Result<{}, { message: string }>
> {
  try {
    await prisma.task.deleteMany({ where: { completed: true } });
  } catch (e) {
    revalidatePath("/");
    logger.error(e, "Failed to clear completed tasks");
    return err({ message: "Failed to clear completed tasks" });
  }
  revalidatePath("/");
  return ok({});
}
