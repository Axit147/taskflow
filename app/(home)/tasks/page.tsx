"use client";

import CardSkeleton from "@/components/CardSkeleton";
import NewTaskForm from "@/components/NewTaskForm";
import TaskCard from "@/components/TaskCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { taskStore, useTasks } from "@/lib/stores/useTasks";
import { userStore, useUser } from "@/lib/stores/useUser";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const TaskPage = () => {
  const user = useUser((state: userStore) => state.user);
  const tasks = useTasks((state: taskStore) => state.tasks);
  const isPending = useTasks((state: taskStore) => state.isPending);

  const [filter, setFilter] = useState<{
    priority: string;
    completed: string;
    dueDate: string;
    projectId: string | number;
  }>({
    priority: "all",
    completed: "all",
    dueDate: "all",
    projectId: "all",
  });

  const handleFilterChange = (type: string, value: string) => {
    setFilter((prevState) => ({
      ...prevState,
      [type]:
        type === "projectId"
          ? value === "all"
            ? value
            : value === "null"
            ? null
            : parseInt(value)
          : value,
    }));
  };

  // Function to filter tasks based on all filters
  const filteredTasks = tasks.filter((task) => {
    const matchPriority =
      filter.priority === "all" || task.priority === filter.priority;
    const matchCompletion =
      filter.completed === "all" ||
      (task.completed && filter.completed === "completed") ||
      (!task.completed && filter.completed === "pending");
    const matchDueDate =
      filter.dueDate === "all" ||
      (filter.dueDate === "future" && new Date(task?.dueDate!) > new Date()) ||
      (filter.dueDate === "past" && new Date(task?.dueDate!) < new Date());
    const matchProjectId =
      filter.projectId === "all" || task.projectId === filter.projectId;

    return matchPriority && matchCompletion && matchDueDate && matchProjectId;
  });

  return (
    <div className="dark:bg-zinc-900 bg-zinc-100 h-full p-6 overflow-y-auto">
      <div className="flex justify-between items-center text-white">
        <div className="text-4xl font-bold bg-gradient-to-r to-sky-500 from-blue-600 w-max bg-clip-text text-transparent">
          Tasks
        </div>
        <Dialog>
          <DialogTrigger className="flex items-center gap-1 p-2 rounded-md bg-blue-600 duration-200 hover:bg-blue-500 shadow-lg hover:shadow-md">
            <Plus className="h-5 w-5" /> New Task
          </DialogTrigger>
          <DialogContent>
            <NewTaskForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6">
        {isPending ? (
          <div className="grid gap-4 grid-flow-row grid-cols-3 grid-rows-3 max-xl:grid-cols-2 max-md:grid-flow-col">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div>
            <div className="p-4 rounded-lg shadow-sm dark:text-white mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Priority Filter */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="priority" className="text-sm font-medium">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={filter.priority}
                    onChange={(e) =>
                      handleFilterChange("priority", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-blue-600 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Completed Filter */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="completed" className="text-sm font-medium">
                    Status
                  </label>
                  <select
                    id="completed"
                    value={filter.completed}
                    onChange={(e) =>
                      handleFilterChange("completed", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                {/* Due Date Filter */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="dueDate" className="text-sm font-medium">
                    Due Date
                  </label>
                  <select
                    id="dueDate"
                    value={filter.dueDate}
                    onChange={(e) =>
                      handleFilterChange("dueDate", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="future">Future Due</option>
                    <option value="past">Past Due</option>
                  </select>
                </div>

                {/* Project ID Filter */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="projectId" className="text-sm font-medium">
                    Project
                  </label>
                  <select
                    id="projectId"
                    value={filter.projectId || "null"}
                    onChange={(e) =>
                      handleFilterChange("projectId", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    {
                      //@ts-ignore
                      user?.projects?.length &&
                        //@ts-ignore
                        user?.projects?.map((project) => (
                          <option key={project.name} value={project.id}>
                            {project.name}
                          </option>
                        ))
                    }
                    <option value="null">None</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Task Grid  */}
            <div className="grid gap-4 grid-flow-row grid-cols-3 grid-rows-3 max-xl:grid-cols-2 max-md:grid-flow-col">
              {filteredTasks?.length ? (
                filteredTasks?.map((task) => {
                  return <TaskCard task={task} key={task.id} />;
                })
              ) : (
                <div>No Tasks Available.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
