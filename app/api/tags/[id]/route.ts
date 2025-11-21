// /app/api/tags/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDatabase from "@/app/lib/mongo";
import Tag from "@/app/api/_models/tag";
import { authenticate } from "@/app/middleware/auth";

// GET tag theo id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDatabase();

    const user = await authenticate(request);
    const { id } = params;

    // Convert user._id sang ObjectId
    const userId = new mongoose.Types.ObjectId(user._id);

    // Convert tag id sang ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid tag id" }, { status: 400 });
    }

    const tag = await Tag.findOne({ _id: id, userId });
    if (!tag) {
      return NextResponse.json({ message: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json({ tag });
  } catch (err: any) {
    console.error("Error GET tag:", err);
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

// PUT cập nhật tag theo id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDatabase();

    const user = await authenticate(request);
    const { id } = params;
    const { name, color } = await request.json();

    if (!name && !color) {
      return NextResponse.json(
        { message: "Nothing to update" },
        { status: 400 }
      );
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid tag id" }, { status: 400 });
    }

    const tag = await Tag.findOneAndUpdate(
      { _id: id, userId },
      { $set: { ...(name && { name }), ...(color && { color }) } },
      { new: true }
    );

    if (!tag) {
      return NextResponse.json({ message: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json({ tag });
  } catch (err: any) {
    console.error("Error PUT tag:", err);
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

// DELETE tag theo id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDatabase();

    const user = await authenticate(request);
    const { id } = params;

    const userId = new mongoose.Types.ObjectId(user._id);

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid tag id" }, { status: 400 });
    }

    const tag = await Tag.findOneAndDelete({ _id: id, userId });
    if (!tag) {
      return NextResponse.json({ message: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Tag deleted", tag });
  } catch (err: any) {
    console.error("Error DELETE tag:", err);
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
