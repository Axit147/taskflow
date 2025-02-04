import React, { useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { tasks } from "@/db/schema";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { updateTask } from "@/lib/queries/updateTask";
import { taskStore, useTasks } from "@/lib/stores/useTasks";

const EditTaskForm = ({ task }: { task: typeof tasks.$inferInsert }) => {
  const [formData, setFormData] = useState<typeof tasks.$inferInsert>({
    ...task,
  });

  const updateClientTasks = useTasks((state: taskStore) => state.updateTasks);
  const clientTasks = useTasks((state: taskStore) => state.tasks);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const { mutateAsync } = useMutation({
    mutationKey: ["update task"],
    mutationFn: () => updateTask(task.id!, formData),
    onSuccess: async (data) => {
      console.log(data);
      updateClientTasks(
        clientTasks.map((task) => (task.id === data.id ? data : task))
      );
    },
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    toast.promise(mutateAsync(), {
      loading: "Saving...",
      success: <b>Saved successfully!</b>,
      error: <b>Could not save.</b>,
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>
          Make changes to your task here. Click save when you're done.
        </DialogDescription>
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
            required
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
            value={formData.dueDate || undefined}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-400"
          />
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
          Save Changes
        </button>
      </form>
    </>
  );
};

export default EditTaskForm;
