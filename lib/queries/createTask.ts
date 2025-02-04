import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createTask(data: typeof tasks.$inferInsert) {
  // console.log("id", userId);
  try {
    const newTask = await db.insert(tasks).values(data).returning();
    return newTask[0];
  } catch (error: any) {
    throw error;
  }
}
