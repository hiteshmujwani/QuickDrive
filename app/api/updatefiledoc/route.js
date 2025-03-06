import { File } from "../../../app/model/FileSchema";
import connectDB from "../../../app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { fileId, password } = await req.json();

    if (!fileId || !password) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const file = await File.findOne({ fileId });

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File not found!" },
        { status: 404 }
      );
    }

    // Update the password
    await File.updateOne({ fileId }, { password });

    return NextResponse.json(
      { success: true, message: "Password saved successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error updating password",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
