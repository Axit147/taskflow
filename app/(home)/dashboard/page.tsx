"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CalendarClock, AlertCircle, CheckCircle } from "lucide-react";
import { taskStore, useTasks } from "@/lib/stores/useTasks";
import { differenceInBusinessDays } from "date-fns";
import TaskCard from "@/components/TaskCard";
import CardSkeleton from "@/components/CardSkeleton";

const DashBoard = () => {
  const tasks = useTasks((state: taskStore) => state.tasks);
  const isTaskPending = useTasks((state: taskStore) => state.isPending);

  const totalTasks = tasks;
  const completedTasks = tasks.filter((task) => task?.completed);
  const completionPercentage =
    totalTasks.length === 0
      ? 0
      : (completedTasks.length / totalTasks.length) * 100;

  const now = new Date();
  const overdueTasks = tasks.filter(
    (task) => task?.dueDate && new Date(task.dueDate) < now && !task?.completed
  );

  const dueSoonTasks = tasks.filter((task) => {
    if (!task?.dueDate || task?.completed) return false;
    const dueDate = new Date(task.dueDate);
    const diffDays = differenceInBusinessDays(dueDate, now);
    return diffDays >= 0 && diffDays <= 7;
  });

  const completionData = [
    {
      name: "Tasks",
      completed: completionPercentage,
      remaining: 100 - completionPercentage,
    },
  ];

  return (
    <div className="rounded-lg shadow-sm p-6 space-y-6 bg-white dark:bg-gray-900 h-full overflow-y-auto">
      <div className="text-4xl font-bold bg-gradient-to-r to-sky-500 from-blue-600 w-max bg-clip-text text-transparent">
        Dashboard
      </div>
      {/* Task Completion Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Task Completion
        </h2>
        <div className="h-20 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={completionData}
              layout="vertical"
              stackOffset="expand"
            >
              <XAxis type="number" hide />
              <YAxis type="category" hide />
              <Tooltip
                cursor={{ fillOpacity: 0.3 }}
                cursorStyle={{ margin: 3 }}
                formatter={(value: string) =>
                  `${Math.round(parseFloat(value))}%`
                }
                labelFormatter={() => "Completion Status"}
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg, #fff)",
                  color: "var(--tooltip-text, #000)",
                  border: "none",
                  borderRadius: 10,
                }}
              />
              <Bar
                barSize={30}
                dataKey="completed"
                fill="#4ade80"
                stackId="stack"
                radius={[40, 0, 0, 40]}
                style={{ marginLeft: 3 }}
              />
              <Bar
                barSize={30}
                dataKey="remaining"
                fill="#f87171"
                stackId="stack"
                radius={[0, 40, 40, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded mr-2"></div>
            <span className="text-gray-600 dark:text-gray-300">
              Completed ({Math.round(completionPercentage)}%)
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-400 rounded mr-2"></div>
            <span className="text-gray-600 dark:text-gray-300">
              Remaining ({Math.round(100 - completionPercentage)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Due Date Statistics */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Due Date Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="text-red-600 dark:text-red-400 w-5 h-5" />
              <h3 className="font-medium text-red-600 dark:text-red-400">
                Overdue
              </h3>
            </div>
            <p className="mt-2 text-2xl font-semibold text-red-700 dark:text-red-400">
              {overdueTasks.length}
            </p>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              tasks past due date
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <CalendarClock className="text-yellow-600 dark:text-yellow-400 w-5 h-5" />
              <h3 className="font-medium text-yellow-600 dark:text-yellow-400">
                Due Soon
              </h3>
            </div>
            <p className="mt-2 text-2xl font-semibold text-yellow-700 dark:text-yellow-400">
              {dueSoonTasks.length}
            </p>
            <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
              tasks due in 7 days
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-600 dark:text-green-400 w-5 h-5" />
              <h3 className="font-medium text-green-600 dark:text-green-400">
                Total Tasks
              </h3>
            </div>
            <p className="mt-2 text-2xl font-semibold text-green-700 dark:text-green-400">
              {totalTasks.length}
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              tasks in total
            </p>
          </div>
        </div>
        <div className="border mt-6 flex" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="mt-6">
            <div className="text-lg font-semibold text-red-700 dark:text-red-400">
              Overdue Tasks
            </div>
            <div className="flex flex-col gap-3 mt-2">
              {isTaskPending ? (
                <CardSkeleton />
              ) : overdueTasks.length ? (
                overdueTasks.map((task) => (
                  <TaskCard task={task} key={task.id} />
                ))
              ) : (
                <span>No tasks.</span>
              )}
            </div>
          </div>
          <div className="mt-6">
            <div className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
              Due Soon Tasks
            </div>
            <div className="flex flex-col gap-3 mt-2">
              {isTaskPending ? (
                <CardSkeleton />
              ) : dueSoonTasks.length ? (
                dueSoonTasks.map((task) => (
                  <TaskCard task={task} key={task.id} />
                ))
              ) : (
                <span>No tasks.</span>
              )}
            </div>
          </div>
          <div className="mt-6">
            <div className="text-lg font-semibold text-green-600 dark:text-green-400">
              Completed Tasks
            </div>
            <div className="flex flex-col gap-3 mt-2">
              {isTaskPending ? (
                <CardSkeleton />
              ) : completedTasks.length ? (
                completedTasks.map((task) => (
                  <TaskCard task={task} key={task.id} />
                ))
              ) : (
                <span>No tasks.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
