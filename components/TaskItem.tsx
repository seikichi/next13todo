"use client";

import { Task } from "@/lib/schema";
import { useCallback } from "react";

export type TaskItemProps = {
  task: Task;
  onRemove: () => void;
  onToggle: () => void;
};

function RemoveButton(props: JSX.IntrinsicElements["button"]) {
  return (
    <button className="flex p-2 btn btn-outline btn-secondary" {...props}>
      <svg
        className="h-6 w-6 text-secondary"
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

export default function TaskItem({ task, onRemove, onToggle }: TaskItemProps) {
  const titleClass = task.completed
    ? "text-lg line-through text-gray-400"
    : "text-lg text-black";

  return (
    <>
      <div className="flex align-middle flex-row justify-between">
        <div className="p-2">
          <input
            type="checkbox"
            className="checkbox"
            onChange={onToggle}
            checked={task.completed}
          />
        </div>
        <div className="p-2">
          <p className={titleClass}>{task.title}</p>
        </div>
        <RemoveButton onClick={onRemove} />
      </div>
      <hr className="mt-2" />
    </>
  );
}
