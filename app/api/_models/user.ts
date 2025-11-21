import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  _id: string | Types.ObjectId; // thêm dòng này
  name: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
