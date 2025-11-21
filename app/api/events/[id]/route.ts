import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDatabase from "@/app/lib/mongo";
import Event from "@/app/api/_models/event";
import { authenticate } from "@/app/middleware/auth";

// POST /events
export async function POST(request: NextRequest) {
  try {
    await connectDatabase();
    const user = await authenticate(request);

    const { title, description, startTime, endTime, tags, status } =
      await request.json();

    if (!title || !startTime || !endTime)
      return NextResponse.json({ message: "Missing fields." }, { status: 400 });

    const event = await Event.create({
      userId: new mongoose.Types.ObjectId(user._id), // convert sang ObjectId
      title,
      description,
      startTime,
      endTime,
      tags,
      status: status || "pending",
    });

    return NextResponse.json({ event });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

// GET /events
export async function GET(request: NextRequest) {
  try {
    await connectDatabase();
    const user = await authenticate(request);

    const events = await Event.find({
      userId: new mongoose.Types.ObjectId(user._id),
    }).populate("tags");
    return NextResponse.json({ events });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

// PUT /events/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDatabase();
    const user = await authenticate(request);

    const body = await request.json();
    const event = await Event.findOneAndUpdate(
      { _id: params.id, userId: new mongoose.Types.ObjectId(user._id) },
      body,
      { new: true }
    );

    if (!event)
      return NextResponse.json(
        { message: "Event not found." },
        { status: 404 }
      );

    return NextResponse.json({ event });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

// DELETE /events/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDatabase();
    const user = await authenticate(request);
    const deleted = await Event.findOneAndDelete({
      _id: params.id,
      userId: new mongoose.Types.ObjectId(user._id),
    });

    if (!deleted)
      return NextResponse.json(
        { message: "Event not found." },
        { status: 404 }
      );

    return NextResponse.json({ message: "Event deleted successfully." });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
