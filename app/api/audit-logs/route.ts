// app/api/audit-logs/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDatabase from "@/app/lib/mongo";
import AuditLog from "@/app/api/_models/auditlog";

/**
 * GET /api/audit-logs?userId=&action=&targetType=
 * Trả về danh sách audit logs, filter theo userId, action, targetType
 */
export async function GET(request: NextRequest) {
  try {
    // 1️⃣ Kết nối database
    await connectDatabase();

    // 2️⃣ Lấy query params từ URL
    const { userId, action, targetType } = Object.fromEntries(
      request.nextUrl.searchParams.entries()
    );

    const filter: any = {};

    // 3️⃣ Filter theo userId nếu có
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return NextResponse.json(
          { message: "Invalid userId format" },
          { status: 400 }
        );
      }
      filter.userId = new mongoose.Types.ObjectId(userId);
    }

    // 4️⃣ Filter theo action và targetType nếu có
    if (action) filter.action = action;
    if (targetType) filter.targetType = targetType;

    // 5️⃣ Lấy logs từ DB, populate thông tin user
    const logs = await AuditLog.find(filter)
      .populate("userId", "name email") // populate user info
      .sort({ timestamp: -1 }); // sắp xếp mới nhất lên đầu

    // 6️⃣ Trả về kết quả
    return NextResponse.json({ logs });
  } catch (err: any) {
    console.error("Error GET /audit-logs:", err);
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
