// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDatabase from "@/app/lib/mongo";
import User from "@/app/api/_models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwt-secret";

export async function POST(request: NextRequest) {
  try {
    await connectDatabase();
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing fields." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 400 }
      );
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: "user",
    });

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
