import { File } from "../../model/FileSchema";
import connectDB from "../../utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const {
    fileName,
    fileFormat,
    shortUrl,
    fileId,
    user,
    fileSize,
    fileUrl,
    password,
  } = await req.json();

  const createdFile = await File.create({
    fileName,
    fileFormat,
    shortUrl,
    fileId,
    user,
    fileSize,
    fileUrl,
    password,
  });

  return NextResponse.json({
    message: "File created successfully",
    success: true,
    createdFile,
  });
}
