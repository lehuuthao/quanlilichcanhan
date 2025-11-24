import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDatabase from "@/app/lib/mongo";
import { authenticate } from "@/app/middleware/auth";
import Reminder from "../_models/reminder";

export async function POST(request: NextRequest) {
  try {
    await connectDatabase();
    const user = await authenticate(request);

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

    // Tạo reminder liên kết với eventId
    const reminder = await Reminder.create({
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

    const url = new URL(request.url);
    const eventId = url.searchParams.get("eventId");

    let query: any = {};
    if (eventId) {
      query.eventId = new mongoose.Types.ObjectId(eventId);
    }

    // Lấy reminder, có thể filter theo eventId nếu được cung cấp
    const reminders = await Reminder.find(query).sort({ time: 1 });

    return NextResponse.json({ reminders });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
