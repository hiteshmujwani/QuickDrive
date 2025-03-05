import { File } from "../../model/FileSchema";
import connectDB from "../../utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url); // Extract query params
  const user = searchParams.get("user");

  const files = await File.find({ user });

  return NextResponse.json({ success: true, files });
}
