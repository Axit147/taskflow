"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { taskStore, useTasks } from "@/lib/stores/useTasks";
import { tasks } from "@/db/schema";

export default function Calendar() {
  const defaultTasks = useTasks((state: taskStore) => state.tasks);

  const calendarTasks = defaultTasks.map((task: typeof tasks.$inferInsert) => ({
    title: task.title,
    start: task.createdAt,
    end: task.dueDate,
    backgroundColor: task.completed && "rgb(74 222 128 / 0.7)",
    borderColor: task.completed && "rgb(74 222 128)",
  }));

  return (
    <div className="rounded-lg shadow-sm p-6 space-y-6 bg-white dark:bg-gray-900 h-full overflow-y-auto">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        //@ts-ignore
        events={calendarTasks}
      />
    </div>
  );
}
