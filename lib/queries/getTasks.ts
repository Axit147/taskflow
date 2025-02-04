import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getTasks(userId: number) {
  // console.log("id", userId);
  try {
    const userTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId));
    console.log("get", userId);
    return userTasks;
  } catch (error) {
    throw error;
  }
}
