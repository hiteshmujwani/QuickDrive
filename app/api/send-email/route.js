import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { toEmail, fileUrl } = await req.json();

    // Validate input
    if (!toEmail || !fileUrl) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 } // HTTP 400: Bad Request
      );
    }

    // Set up the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
      },
    });

    // Email content
    const mailOptions = {
      from: `"QuickDrive" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "📂 You've received a document!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; text-align: center;">
          <h2>📄 QuickDrive File Sharing</h2>
          <p>You have received a document from QuickDrive.</p>
          <p><strong>Click the button below to access the file:</strong></p>
          <a href="${fileUrl}" target="_blank" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-top: 10px;">
            View File
          </a>
          <p>If the button doesn't work, you can also open this link: <br>
            <a href="${fileUrl}" target="_blank">${fileUrl}</a>
          </p>
          <hr>
          <p style="font-size: 12px; color: #777;">This is an automated email from QuickDrive.</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Error sending email", error: error.message },
      { status: 500 }
    );
  }
}
