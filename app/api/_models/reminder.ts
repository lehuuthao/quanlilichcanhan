import mongoose, { Document, Schema } from "mongoose";

export interface IReminder extends Document {
  eventId: mongoose.Types.ObjectId;
  time: Date;
  createdAt: Date;
  updatedAt: Date;
}

const reminderSchema: Schema = new mongoose.Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    time: { type: Date, required: true },
  },
  { timestamps: true }
);

const Reminder =
  mongoose.models.Reminder ||
  mongoose.model<IReminder>("Reminder", reminderSchema);
export default Reminder;
