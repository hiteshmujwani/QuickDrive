import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { toEmail, fileUrl } = await req.json();

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
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "You've received a document!",
      html: `<p>Click <a href="${fileUrl}">here</a> to access the file.</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 }
    );
  }
}
