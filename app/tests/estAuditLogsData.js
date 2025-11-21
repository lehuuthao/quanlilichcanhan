import mongoose from "mongoose";
import connectDatabase from "./app/lib/mongo";
import AuditLog from "./app/api/_models/auditlog";
(async () => {
  await connectDatabase();
  const logs = await AuditLog.find().populate("userId", "name email").limit(5);
  console.log(logs);
})();
