// app/api/reminders/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDatabase from "@/app/lib/mongo";
import Reminder from "@/app/api/_models/reminder";
import { authenticate } from "@/app/middleware/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDatabase();
    await authenticate(request);
    const deleted = await Reminder.findByIdAndDelete(params.id);
    if (!deleted)
      return NextResponse.json(
        { message: "Reminder not found" },
        { status: 404 }
      );
    return NextResponse.json({ message: "Reminder deleted successfully." });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: err.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
