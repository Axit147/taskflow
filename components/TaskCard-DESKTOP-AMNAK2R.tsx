"use client";

import React from "react";
import { AlertTriangle, CheckCircle, Edit, Trash2 } from "lucide-react";
import { tasks } from "@/db/schema";
import EditTaskForm from "./EditTaskForm";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { deleteTask } from "@/lib/queries/deleteTask";
import { taskStore, useTasks } from "@/lib/stores/useTasks";

const TaskCard = ({ task }: { task: typeof tasks.$inferInsert }) => {
  const priorityConfig = {
    low: { color: "text-green-500", label: "Low Priority" },
    medium: { color: "text-yellow-500", label: "Medium Priority" },
    high: { color: "text-red-500", label: "High Priority" },
  };

  const updateClientTasks = useTasks((state: taskStore) => state.updateTasks);
  const clientTasks = useTasks((state: taskStore) => state.tasks);

  const { mutateAsync } = useMutation({
    mutationKey: ["delete task"],
    mutationFn: () => deleteTask(task.id!),
    onSuccess: (id) => {
      updateClientTasks(clientTasks.filter((task) => task.id !== id));
    },
  });

  return (
    <div className="w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="bg-gray-100 dark:bg-gray-900 p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          {task.title}
        </h2>
        <div className="flex items-center space-x-2">
          <AlertTriangle
            className={`${priorityConfig[task.priority!]?.color}`}
            size={24}
          />
          {task.completed && (
            <CheckCircle
              className="text-green-500 dark:text-green-400"
              size={24}
            />
          )}
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="text-sm text-gray-600 dark:text-gray-300 italic">
          {task.description}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Due Date:
            </span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {task.dueDate || "Not set"}
            </span>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium 
            ${
              task.completed
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
            }`}
          >
            {task.completed ? "Completed" : "In Progress"}
          </div>
        </div>
        <div className="flex justify-between">
          <Dialog>
            <DialogTrigger>
              <Edit className="h-7 w-7 text-blue-400 cursor-pointer dark:hover:bg-slate-500/40 hover:bg-slate-200/50 p-1 rounded duration-200" />
            </DialogTrigger>
            <DialogContent className="dark:bg-slate-900 dark:text-white">
              <EditTaskForm task={task} />
            </DialogContent>
          </Dialog>
          <Trash2
            onClick={() => {
              toast.promise(mutateAsync(), {
                loading: "Saving...",
                success: <b>Saved successfully!</b>,
                error: <b>Could not save.</b>,
              });
            }}
            className="h-7 w-7 text-red-400 cursor-pointer dark:hover:bg-slate-500/40 hover:bg-slate-200/50 p-1 rounded duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
