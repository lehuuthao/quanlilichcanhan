// app/api/users/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { isEmpty } from "lodash";
import connectDatabase from "@/app/lib/mongo";
import { authenticate } from "@/app/middleware/auth";
import { IUser } from "@/app/api/_models/user";

export async function GET(request: NextRequest) {
  try {
    await connectDatabase();

    const user = await authenticate(request);

    if (!user || isEmpty(user)) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const JWT_SECRET = process.env.JWT_SECRET || "jwt-secret";

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      JWT_SECRET
    );

    return NextResponse.json({
      user,
      token,
    });
  } catch (err: any) {
    console.error("GET /api/users/me ERROR:", err?.message);
    return NextResponse.json(
      { message: err?.message || "Internal Server Error" },
      { status: err?.message?.includes("Unauthorized") ? 401 : 500 }
    );
  }
}
