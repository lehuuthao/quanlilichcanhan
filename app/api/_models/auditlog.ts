import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAuditLog extends Document {
  userId: Types.ObjectId;
  action: string;
  targetId?: Types.ObjectId;
  targetType?: string;
  meta?: object;
  timestamp: Date;
}

const auditLogSchema: Schema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    targetId: { type: Schema.Types.ObjectId },
    targetType: { type: String },
    meta: { type: Object },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const AuditLog =
  mongoose.models.AuditLog ||
  mongoose.model<IAuditLog>("AuditLog", auditLogSchema);
export default AuditLog;
