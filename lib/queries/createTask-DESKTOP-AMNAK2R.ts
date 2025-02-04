import { db } from "@/db";
import { tasks } from "@/db/schema";

export async function createTask(data: typeof tasks.$inferInsert) {
  try {
    const newTask = await db.insert(tasks).values(data).returning();
    return newTask[0];
  } catch (error: any) {
    throw error;
  }
}
