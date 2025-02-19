import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../../db/schema";

export async function getUser(email: string) {
  const db = drizzle(process.env.NEXT_PUBLIC_DATABASE_URL!, { schema });
  const user = await db.query.users.findMany({
    with: {
      projects: true,
    },
    where: eq(users.email, email),
  });
  if (!user.length) return null;

  return user[0];
}
