import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteTask(taskId: number) {
  // console.log("id", userId);
  try {
    const res = await db.delete(tasks).where(eq(tasks.id, taskId)).returning();
    return res[0].id;
  } catch (error: any) {
    throw error;
  }
}
