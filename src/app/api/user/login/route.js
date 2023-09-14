import { DB } from "@/app/libs/DB";
import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server";

//POST /api/user/login
export const POST = async (request) => {
  const body = await request.json();
  const { username, password } = body;
  const user = DB.users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      {
        ok: false,
        message: "Username or password is incorrect",
      },
      { status: 400 }
    );
  }

  const token = jsonwebtoken.sign(
    { username, role: user.role, studentId: user.studentId },
    process.env.JWT_SECRET,

    {
      expiresIn: "8h",
    }
  );

  return NextResponse.json({ ok: true, token });
};
