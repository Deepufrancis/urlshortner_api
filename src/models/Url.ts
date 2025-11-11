import mongoose, { Schema, Document } from "mongoose";

export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  clicks: number;
  date: Date;
}

const urlSchema = new Schema<IUrl>({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  shortCode: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IUrl>("Url", urlSchema);
