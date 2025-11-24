// app/api/comments/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDatabase from "@/app/lib/mongo";

// Đăng ký model TRƯỚC KHI authenticate
import "@/app/api/_models/user";
import "@/app/api/_models/event";
import Comment from "@/app/api/_models/comment";

import { authenticate } from "@/app/middleware/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDatabase();
    const user = await authenticate(request);

    const { eventId, content } = await request.json();
    if (!eventId || !content)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const comment = await Comment.create({
      eventId: new mongoose.Types.ObjectId(eventId),
      userId: new mongoose.Types.ObjectId(user._id),
      content,
    });

    return NextResponse.json({ comment });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDatabase();
    await authenticate(request);

    const eventId = request.nextUrl.searchParams.get("eventId");
    if (!eventId)
      return NextResponse.json({ message: "Missing eventId" }, { status: 400 });

    const comments = await Comment.find({
      eventId: new mongoose.Types.ObjectId(eventId),
    }).populate("userId", "name email");

    return NextResponse.json({ comments });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
