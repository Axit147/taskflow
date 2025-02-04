import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getTasks(userId: number) {
  try {
    const userTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId));
    return userTasks;
  } catch (error: any) {
    throw error;
  }
}
