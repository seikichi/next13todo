import { Task } from "@/lib/schema";
import { prisma } from "@/lib/db";
import TaskList from "@/components/TaskList";

export const revalidate = 0;

export default async function Page() {
  const dbTasks = await prisma.task.findMany();
  const tasks = dbTasks.map((t) => Task.parse(t));

  return (
    <div className="w-full h-screen bg-gray-100 pt-8">
      <div className="bg-white p-3 max-w-md mx-auto">
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}
