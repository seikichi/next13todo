"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import { NewTask, Task } from "./schema";
import { Result, err, ok } from "./result";

export async function addTask(
  task: NewTask
): Promise<Result<{}, { message: string }>> {
  console.log("addTask:", task);

  try {
    await prisma.task.create({ data: task });
  } catch (e) {
    // NOTE: Use pino
    console.error(e);
    return err({ message: "Failed to create new task" });
  }
  revalidatePath("/");
  return ok({});
}

export async function deleteTask({ id }: Pick<Task, "id">) {
  console.log("deleteTask:", { id });

  try {
    await prisma.task.delete({ where: { id } });
  } catch (e) {
    console.error(e);
    return err({ message: "Failed to delete task" });
  }
  revalidatePath("/");
  return ok({});
}

export async function sayHello() {
  console.log("Hello, world! (from sayHello)");
}
