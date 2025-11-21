// app/api/reminders/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDatabase from "@/app/lib/mongo";
import Reminder from "@/app/api/_models/reminder";
import { authenticate } from "@/app/middleware/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDatabase();

    const user = await authenticate(request);

    // Parse JSON body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { eventId, time } = body;

    if (!eventId || !time) {
      return NextResponse.json(
        { message: "Missing fields: eventId or time" },
        { status: 400 }
      );
    }

    // Tạo reminder
    const reminder = await Reminder.create({
      userId: new mongoose.Types.ObjectId(user._id),
      eventId: new mongoose.Types.ObjectId(eventId),
      time: new Date(time),
    });

    return NextResponse.json({ reminder });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDatabase();

    const user = await authenticate(request);

    // Lấy tất cả reminder của user
    const reminders = await Reminder.find({
      userId: new mongoose.Types.ObjectId(user._id),
    }).sort({ time: 1 }); // sắp xếp theo thời gian tăng dần

    return NextResponse.json({ reminders });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
