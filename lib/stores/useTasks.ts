import { tasks, users } from "@/db/schema";
import { create } from "zustand";

export interface taskStore {
  tasks: (typeof tasks.$inferInsert)[];
  isPending: boolean;
  updateTasks: (data: (typeof tasks.$inferInsert)[]) => void;
  setPendingState: (state: boolean) => void;
}

export const useTasks = create<taskStore>((set) => ({
  tasks: [],
  isPending: true,
  updateTasks: (data) => set({ tasks: data }),
  setPendingState: (state) => set({ isPending: state }),
}));
