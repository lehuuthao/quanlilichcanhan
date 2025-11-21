// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDatabase from "@/app/lib/mongo";
import User from "@/app/api/_models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connectDatabase();
    const { email, password } = await request.json();
    if (!email || !password)
      return NextResponse.json({ message: "Missing fields." }, { status: 400 });

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ message: "User not found." }, { status: 400 });

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid)
      return NextResponse.json(
        { message: "Invalid password." },
        { status: 400 }
      );

    const token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET || "jwt-secret"
    );

    return NextResponse.json({ user, token });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
