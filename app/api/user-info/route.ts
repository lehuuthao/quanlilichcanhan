// app/api/users/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/app/middleware/auth";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const user = await authenticate(request);
    const _token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET || "jwt-secret"
    );
    return NextResponse.json({ user, token: _token });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
