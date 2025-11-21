import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  eventId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema: Schema = new mongoose.Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);
export default Comment;
