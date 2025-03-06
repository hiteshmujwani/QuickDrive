import { File } from "../../model/FileSchema";
import connectDB from "../../utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");

    if (!fileId) {
      return NextResponse.json(
        { success: false, message: "Something Went Wrong Try Again !" },
        { status: 400 }
      );
    }

    const file = await File.findOne({ fileId });

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, file }, { status: 200 });
  } catch (error) {
    console.error("Error getting file:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
