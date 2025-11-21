// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDatabase from "@/app/lib/mongo";
import User from "@/app/api/_models/user";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectDatabase();
    const { name, email, password } = await request.json();
    if (!name || !email || !password)
      return NextResponse.json({ message: "Missing fields." }, { status: 400 });

    const exists = await User.findOne({ email });
    if (exists)
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 400 }
      );

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
