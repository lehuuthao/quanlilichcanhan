// /app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDatabase from "@/app/lib/mongo";
import { Event, Tag } from "@/app/api/_models/event";
import { authenticate } from "@/app/middleware/auth";

// POST /events - tạo event mới
export async function POST(request: NextRequest) {
  try {
    await connectDatabase();
    const user = await authenticate(request);

    const { title, description, startTime, endTime, tags, status } =
      await request.json();

    if (!title || !startTime || !endTime)
      return NextResponse.json({ message: "Missing fields." }, { status: 400 });

    const event = await Event.create({
      userId: new mongoose.Types.ObjectId(user._id),
      title,
      description,
      startTime,
      endTime,
      tags,
      status: status || "pending",
    });

    return NextResponse.json({ event });
  } catch (err: any) {
    console.error("Error creating event:", err);
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

// GET /events - lấy tất cả event của user
export async function GET(request: NextRequest) {
  try {
    await connectDatabase();
    const user = await authenticate(request);

    const events = await Event.find({
      userId: new mongoose.Types.ObjectId(user._id),
    }).populate("tags"); // populate tags đúng với model Tag

    return NextResponse.json({ events });
  } catch (err: any) {
    console.error("Error fetching events:", err);
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
