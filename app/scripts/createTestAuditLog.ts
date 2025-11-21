// app/scripts/createTestAuditLog.ts
import mongoose from "mongoose";
import connectDatabase from "../lib/mongo";
import AuditLog from "../api/_models/auditlog";

(async () => {
  await connectDatabase();

  const userId = new mongoose.Types.ObjectId("692079bce47cc2bbc3b57a0b"); // userId test

  await AuditLog.create({
    userId,
    action: "CREATE",
    targetType: "Event",
    meta: { info: "Test log" },
  });

  console.log("✅ Created test audit log");
  process.exit(0);
})();
