import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateTask(
  taskId: number,
  data: typeof tasks.$inferInsert
) {
  try {
    const updatedTask = await db
      .update(tasks)
      .set(data)
      .where(eq(tasks.id, taskId))
      .returning();
    return updatedTask[0];
  } catch (error: any) {
    throw error;
  }
}
