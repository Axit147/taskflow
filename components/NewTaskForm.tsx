"use client";

import React, { useEffect, useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createTask } from "@/lib/queries/createTask";
import { useTasks } from "@/lib/stores/useTasks";
import { useUser } from "@/lib/stores/useUser";
import { tasks } from "@/db/schema";

type TaskFormData = {
  title: string;
  description?: string;
  dueDate: string | null;
  priority: "low" | "medium" | "high";
  projectId: number | null;
  completed: boolean;
};

const NewTaskForm = () => {
  const user = useUser((state) => state.user);
  const updateClientTasks = useTasks((state) => state.updateTasks);
  const clientTasks = useTasks((state) => state.tasks);

  const [formData, setFormData] = useState<typeof tasks.$inferInsert>({
    title: "",
    description: "",
    dueDate: null,
    priority: "medium",
    projectId: null,
    completed: false,
    userId: user?.id!,
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["update task"],
    mutationFn: () => createTask(formData),
    onSuccess: (data) => {
      updateClientTasks([...clientTasks, data]);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "projectId"
          ? value === "null"
            ? null
            : parseInt(value)
          : value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim() || formData.title.length < 3) {
      toast.error("Title must be at least 3 characters.");
      return false;
    }

    if (formData.description && formData.description.length > 500) {
      toast.error("Description cannot exceed 500 characters.");
      return false;
    }

    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today to start of the day

      if (selectedDate < today) {
        toast.error("Due date cannot be in the past.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    toast.promise(mutateAsync(), {
      loading: "Saving task...",
      success: "Task saved successfully!",
      error: "Failed to save task.",
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Task</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
            maxLength={500}
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate || ""}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Project Selection */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="projectId" className="text-sm font-medium">
            Project
          </label>
          <select
            name="projectId"
            id="projectId"
            value={formData.projectId || "null"}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="null">None</option>
            {
              //@ts-ignore
              user?.projects?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))
            }
          </select>
        </div>

        {/* Completed Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium">Completed</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Save Task
        </button>
      </form>
    </>
  );
};

export default NewTaskForm;
