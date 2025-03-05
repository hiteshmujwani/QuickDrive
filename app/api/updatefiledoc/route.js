import { File } from "../../../app/model/FileSchema";
import connectDB from "../../../app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const { fileId, password } = await req.json();

  let updatedFile = await File.findOne({ fileId });
  updatedFile = await updatedFile.updateOne({ password });

  return NextResponse.json({
    message: "Password Saved !",
    success: true,
    // updatedFile,
  });
}
