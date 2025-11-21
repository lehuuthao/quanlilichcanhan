import mongoose, { Document, Schema } from "mongoose";

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

const Tag = mongoose.models.Tag || mongoose.model<ITag>("Tag", tagSchema);
export default Tag;
