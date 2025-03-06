import { File } from "../../model/FileSchema";
import connectDB from "../../utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const fileData = await req.json();

    const createdFile = await File.create(fileData);

    return NextResponse.json(
      {
        message: "File uploaded successfully",
        success: true,
        createdFile,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      {
        message: "Failed to upload file",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
