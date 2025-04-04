import { File } from "../../model/FileSchema";
import connectDB from "../../utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Something Went Wrong !" },
        { status: 400 }
      );
    }

    const files = await File.find({ user });

    if (!files.length) {
      return NextResponse.json(
        { success: false, message: "No files found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, files }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user files:", error);
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
