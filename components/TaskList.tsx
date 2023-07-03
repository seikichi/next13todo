"use client";

import {
  useCallback,
  experimental_useOptimistic as useOptimistic,
} from "react";
import { NewTask, Task } from "@/lib/schema";
import AddTaskForm from "./AddTaskForm";
import TaskItem from "./TaskItem";
import {
  addTask,
  clearCompletedTasks,
  deleteTask,
  updateTask,
} from "@/lib/actions";

type TaskListProps = {
  tasks: readonly Task[];
};

type Action =
  | { type: "ADD_TASK"; payload: NewTask }
  | { type: "UPDATE_TASK"; payload: Pick<Task, "id" | "completed"> }
  | { type: "DELETE_TASK"; payload: Pick<Task, "id"> }
  | { type: "CLEAR_COMPLETED" };

function useTaskDispatch(data: readonly Task[]) {
  return useOptimistic(data, (state, action: Action) => {
    if (action.type === "ADD_TASK") {
      return [
        ...state,
        Task.parse({ ...action.payload, completed: false, id: 0 }),
      ];
    }
    if (action.type === "UPDATE_TASK") {
      const { id, completed } = action.payload;
      return state.map((s) => (s.id === id ? { ...s, completed } : s));
    }
    if (action.type === "DELETE_TASK") {
      return state.filter((s) => s.id !== action.payload.id);
    }
    if (action.type === "CLEAR_COMPLETED") {
      return state.filter((s) => !s.completed);
    }

    throw new Error(
      `unknown type: ${(action as { type: "__invalid__" }).type}`
    );
  });
}

export default function TaskList(props: TaskListProps) {
  const [tasks, dispatch] = useTaskDispatch(props.tasks);

  const clearCompleted = useCallback(async () => {
    dispatch({ type: "CLEAR_COMPLETED" });
    await clearCompletedTasks();
  }, [dispatch]);

  const onRemoveTask = useCallback(
    async (id: number) => {
      dispatch({ type: "DELETE_TASK", payload: { id } });
      await deleteTask({ id });
    },
    [dispatch]
  );

  const onUpdateTask = useCallback(
    async (id: number, completed: boolean) => {
      dispatch({ type: "UPDATE_TASK", payload: { id, completed } });
      await updateTask({ id, completed });
    },
    [dispatch]
  );

  const onAddTask = useCallback(
    async (task: NewTask) => {
      dispatch({ type: "ADD_TASK", payload: task });
      await addTask(task);
    },
    [dispatch]
  );

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">ToDo App</h1>
        <AddTaskForm onAdd={onAddTask} />
      </div>
      <div className="mt-8">
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="p-2 rounded-lg">
              <TaskItem
                task={task}
                onRemove={() => onRemoveTask(task.id)}
                onToggle={() => onUpdateTask(task.id, !task.completed)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <button
          className="border-2 border-red-500 p-2 text-red-500"
          onClick={clearCompleted}
        >
          Clear Completed Task
        </button>
      </div>
    </>
  );
}
