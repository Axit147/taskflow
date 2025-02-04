import { db } from "@/db";
import { projects, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(email: string) {
  const user = await db.select().from(users).where(eq(users.email, email));
  if (!user.length) return null;
  const userProjects = await db
    .select({ id: projects.id, name: projects.name })
    .from(projects)
    .where(eq(projects.userId, user[0].id));
  return { ...user[0], projects: userProjects };
}
