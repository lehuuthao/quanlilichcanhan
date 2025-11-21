// app/api/comments/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDatabase from "@/app/lib/mongo";
import Comment from "@/app/api/_models/comment";
import { authenticate } from "@/app/middleware/auth";

// DELETE comment theo id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDatabase();
    const user = await authenticate(request);

    const deleted = await Comment.findOneAndDelete({
      _id: params.id,
      userId: new mongoose.Types.ObjectId(user._id),
    });

    if (!deleted)
      return NextResponse.json(
        { message: "Comment not found or unauthorized" },
        { status: 404 }
      );

    return NextResponse.json({
      message: "Comment deleted successfully.",
      comment: deleted,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

// PUT cập nhật comment theo id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDatabase();
    const user = await authenticate(request);

    const { content } = await request.json();
    if (!content)
      return NextResponse.json({ message: "Missing content" }, { status: 400 });

    const updated = await Comment.findOneAndUpdate(
      { _id: params.id, userId: new mongoose.Types.ObjectId(user._id) },
      { $set: { content } },
      { new: true }
    );

    if (!updated)
      return NextResponse.json(
        { message: "Comment not found or unauthorized" },
        { status: 404 }
      );

    return NextResponse.json({ comment: updated });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
