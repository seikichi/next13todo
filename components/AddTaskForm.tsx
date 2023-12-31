"use client";

import { NewTask } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";

type AddTaskFormProps = {
  onAdd: (task: NewTask) => Promise<void>;
};

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
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
        reset();
        await onAdd(task);
      })();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 flex">
        <div className="form-control w-full max-w-xs">
          <input
            type="text"
            placeholder="Enter your task here"
            className="input input-bordered input-primary w-80"
            {...register("title")}
          />
          {errors.title && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.title.message}
              </span>
            </label>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary ml-2 p-2 flex"
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
