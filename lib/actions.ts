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
    // NOTE: Use pino
    logger.error(e, "Failed to create new task");
    return err({ message: "Failed to create new task" });
  }
  revalidatePath("/");
  return ok({});
}

export async function deleteTask({ id }: Pick<Task, "id">) {
  logger.info({ message: "deleteTask", task: { id } });

  try {
    await prisma.task.delete({ where: { id } });
  } catch (e) {
    logger.error(e, "Failed to delete task");
    return err({ message: "Failed to delete task" });
  }
  revalidatePath("/");
  return ok({});
}

export async function sayHello() {
  logger.info("Hello, world! (from sayHello)");
}
