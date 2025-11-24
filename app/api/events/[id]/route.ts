import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDatabase from "@/app/lib/mongo";
import { Event, Tag } from "@/app/api/_models/event";

import { authenticate } from "@/app/middleware/auth";

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
    console.error("Error updating event:", err);
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

// DELETE /events/[id] - xóa event
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
    console.error("Error deleting event:", err);
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
