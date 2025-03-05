import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  fileName: { type: String },
  fileFormat: { type: String },
  fileSize: { type: String },
  fileUrl: { type: String },
  fileId: { type: String },
  user: { type: String },
  shortUrl: { type: String },
  password: { type: String, default: "" },
});

export const File = mongoose.models.File || mongoose.model("File", FileSchema);
