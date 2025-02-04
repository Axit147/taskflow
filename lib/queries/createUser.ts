import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createUser(data: typeof users.$inferInsert) {
  try {
    const user = await db.insert(users).values(data);
    return user;
  } catch (error: any) {
    throw error;
  }
}
