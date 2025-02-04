import { db } from "@/db";
import { users } from "@/db/schema";

export async function createUser(data: typeof users.$inferInsert) {
  try {
    const user = await db.insert(users).values(data);
    return user;
  } catch (error) {
    throw error;
  }
}
