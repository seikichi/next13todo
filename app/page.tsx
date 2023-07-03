import { Task } from "@/lib/schema";
import TaskItem from "@/components/TaskItem";
import AddTaskForm from "@/components/AddTaskForm";
import ClearButton from "@/components/ClearButton";
import ResetButton from "@/components/ResetButton";
import { prisma } from "@/lib/db";

export const revalidate = 0;

export default async function Page() {
  const dbTasks = await prisma.task.findMany();
  const tasks = dbTasks.map((t) => Task.parse(t));
  console.log(tasks);

  // const tasks = [
  //   Task.parse({ id: 1, title: "Cook maggie", completed: true }),
  //   Task.parse({ id: 2, title: "Wash disc", completed: false }),
  // ];

  return (
    <div className="w-full h-screen bg-gray-100 pt-8">
      <div className="bg-white p-3 max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold">ToDo App</h1>
          <AddTaskForm />
        </div>
        <div className="mt-8">
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="p-2 rounded-lg">
                <TaskItem task={task} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <ClearButton />
          <ResetButton />
        </div>
      </div>
    </div>
  );
}
