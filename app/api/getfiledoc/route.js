import { File } from "../../model/FileSchema";
import connectDB from "../../utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url); // Extract query params
  const fileId = searchParams.get("fileId");

  const file = await File.findOne({ fileId });

  return NextResponse.json({ success: true, file });
}
