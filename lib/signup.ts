import { users } from "@/db/schema";

export default async function signup(data: typeof users.$inferInsert) {
  let token = null;
  try {
    token = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await token.json();
  } catch (error) {
    throw error;
  }
}
