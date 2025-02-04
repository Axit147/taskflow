import { getUser } from "@/lib/queries/getUser";
import { NextResponse } from "next/server";
import { createUser } from "@/lib/queries/createUser";

export async function POST(req: Request) {
  const data = await req.json();
  let user = null;
  const existingUser = await getUser(data.email);
  if (existingUser) {
    return NextResponse.json(
      { error: { detail: "User with this email already exists." } },
      { status: 500 }
    );
  }
  try {
    user = await createUser(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  if (user) {
    return NextResponse.json(user);
  }
}
