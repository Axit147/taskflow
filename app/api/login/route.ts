import jwt from "jsonwebtoken";
import { getUser } from "@/lib/queries/getUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await getUser(email);

  if (user === null) {
    return NextResponse.json(
      { error: "No user found with given Email" },
      { status: 404 }
    );
  } else if (password === user.password) {
    return NextResponse.json({
      token: jwt.sign(user, user.id.toString()),
    });
  } else {
    return NextResponse.json({ error: "Invalid password!" }, { status: 404 });
  }
}
