// /app/api/_models/models.ts
import mongoose, { Document, Schema } from "mongoose";

// ===== Tag =====
export interface ITag extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const tagSchema: Schema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    color: { type: String, default: "#000000" },
  },
  { timestamps: true }
);

export const Tag =
  mongoose.models.Tag || mongoose.model<ITag>("Tag", tagSchema);

// ===== Event =====
export interface IEvent extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  status: "pending" | "done" | "canceled";
  tags: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema: Schema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "done", "canceled"],
      default: "pending",
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  },
  { timestamps: true }
);

export const Event =
  mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);
