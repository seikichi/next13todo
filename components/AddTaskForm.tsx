"use client";

import { addTask } from "@/lib/actions";
import { NewTask } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";

export default function AddTaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewTask>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(NewTask),
  });

  const onSubmit = async (task: NewTask) => {
    startTransition(() => {
      (async () => {
        await addTask(task);
        reset();
      })();
    });
  };

  console.log({ isSubmitting, errors });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 flex">
        <input
          className="w-80 border-b-2 border-gray-500 text-black"
          placeholder="Enter your task here"
          {...register("title")}
        />
        <button
          type="submit"
          className="ml-2 border-2 border-green-500 p-2 text-green-500 hover:text-white hover:bg-green-500 rounded-lg flex"
          disabled={isSubmitting}
        >
          <svg
            className="h-6 w-6"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <circle cx="12" cy="12" r="9" />{" "}
            <line x1="9" y1="12" x2="15" y2="12" />{" "}
            <line x1="12" y1="9" x2="12" y2="15" />
          </svg>
          <span>Add</span>
        </button>
      </div>
    </form>
  );
}
