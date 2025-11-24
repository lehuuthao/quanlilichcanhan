// /app/api/tags/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDatabase from "@/app/lib/mongo";
import { Event, Tag } from "@/app/api/_models/event";

import { authenticate } from "@/app/middleware/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDatabase();

    // 1️⃣ Xác thực user từ JWT
    const user = await authenticate(request);

    // 2️⃣ Lấy dữ liệu từ body
    const { name, color } = await request.json();
    if (!name) {
      return NextResponse.json({ message: "Missing name" }, { status: 400 });
    }

    // 3️⃣ Chuyển _id sang ObjectId MongoDB
    const userId = new mongoose.Types.ObjectId(user._id);

    // 4️⃣ Tạo tag
    const tag = await Tag.create({
      userId,
      name,
      color: color || "#000000",
    });

    return NextResponse.json({ tag });
  } catch (err: any) {
    console.error("Error creating tag:", err);
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDatabase();

    // 1️⃣ Xác thực user từ JWT
    const user = await authenticate(request);

    // 2️⃣ Lấy userId và convert sang ObjectId
    const userId = new mongoose.Types.ObjectId(user._id);

    // 3️⃣ Query tất cả tag của user
    const tags = await Tag.find({ userId });

    return NextResponse.json({ tags });
  } catch (err: any) {
    console.error("Error fetching tags:", err);
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
