"use client";

import { deleteTask, sayHello } from "@/lib/actions";
import { Task } from "@/lib/schema";
import { startTransition, useCallback } from "react";

export type TaskItemProps = {
  task: Task;
};

function RemoveButton(props: JSX.IntrinsicElements["button"]) {
  return (
    <button
      className="flex text-red-500 border-2 border-red-500 p-2 rounded-lg"
      {...props}
    >
      <svg
        className="h-6 w-6 text-red-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" /> <line x1="15" y1="9" x2="9" y2="15" />{" "}
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
      <span>Remove</span>
    </button>
  );
}

export default function TaskItem({ task }: TaskItemProps) {
  const handleRemove = useCallback(() => {
    startTransition(() => {
      (async () => {
        await deleteTask({ id: task.id });
      })();
    });
  }, [task.id]);

  const toggleCheck = useCallback(() => {}, []);

  const titleClass = task.completed
    ? "text-lg line-through text-gray-400"
    : "text-lg text-black";

  return (
    <>
      <div className="flex align-middle flex-row justify-between">
        <div className="p-2">
          <input
            type="checkbox"
            className="h-6 w-6 "
            value="true"
            onChange={toggleCheck}
            checked={task.completed}
          />
        </div>
        <div className="p-2">
          <p className={titleClass}>{task.title}</p>
        </div>
        <RemoveButton onClick={handleRemove} />
      </div>
      <hr className="mt-2" />
    </>
  );
}
