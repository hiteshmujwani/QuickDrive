"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FilePreviewContainer from "./_components/FilePreviewContainer";
import { ArrowLeftSquareIcon, Copy, Loader2 } from "lucide-react";
import { Particles } from "@/components/magicui/particles";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { GET_FILE_USER, SEND_EMAIL, UPDATE_FILE } from "@/app/constant/ApiUrls";

const FilePreview = () => {
  const { user, isLoaded } = useUser();
  const { fileId } = useParams();
  const router = useRouter();
  const [file, setFile] = useState({});
  const [enablePassword, setEnablePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [email, setEmail] = useState("");

  const fetchFile = async () => {
    try {
      if (!user) return;
      const userEmail = user?.emailAddresses[0]?.emailAddress;

      if (!userEmail) throw new Error("User email not found.");

      const response = await axios.get(
        `${GET_FILE_USER}?fileId=${fileId}&user=${userEmail}`
      );

      if (response.data.success) {
        setFile(response.data.file);

        setPassword(response.data.file.password || "");
        setShortUrl(response.data.file.shortUrl);
      }
    } catch (error) {
      console.log("Error fetching file:", error);
    }
  };

  const handleSendEmail = async () => {
    if (!email) {
      toast("Please Enter Email!", { position: "top-center" });
      return;
    }

    try {
      setIsEmailSending(true);
      const response = await axios.post(SEND_EMAIL, {
        toEmail: email,
        fileUrl: file.shortUrl,
      });

      toast("Email sent successfully!", { position: "top-center" });
    } catch (error) {
      console.log("Error sending email:", error);
      toast("Failed to send email.", { position: "top-center" });
    } finally {
      setIsEmailSending(false);
    }
  };

  const handleSavePassword = async () => {
    if (!password.trim()) {
      toast("Please enter a password.", { position: "top-center" });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(UPDATE_FILE, {
        password,
        fileId,
      });

      if (response.data.success) {
        toast("Password updated successfully!", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast("Failed to update password.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(file?.shortUrl);
      toast("Link copied!", { position: "top-center" });
    } catch (error) {
      toast("Failed to copy link.", { position: "top-center" });
    }
  };

  useEffect(() => {
    if (fileId && isLoaded) {
      fetchFile();
    }
  }, [fileId, isLoaded]);

  return (
    <div className="h-[calc(100vh-10vh)] relative">
      <Particles className="absolute h-full w-full top-0 left-0 z-[-1]" />
      {file.fileId ? (
        <div className="flex flex-col justify-center items-center">
          <div className="text-left flex items-center gap-2 font-medium text-lg w-full px-6 md:w-4xl md:px-5 sm:w-sm sm:px-1">
            <ArrowLeftSquareIcon
              className="cursor-pointer"
              onClick={() => router.back()}
            />
            Go Back
          </div>

          <div className="flex md:flex-row flex-col xl:gap-6 md:items-center bg-white border m-6 rounded-lg md:p-6 p-1">
            <div className="bg-gray-50 md:w-sm flex flex-col justify-center items-center rounded-lg m-4 p-6 gap-1">
              <FilePreviewContainer
                fileUrl={file.fileUrl}
                fileType={file.fileFormat}
              />
              <div className="text-center">{file.fileName}</div>
              <div>
                {file.fileFormat} / {(file.fileSize / 1000 / 1000).toFixed(2)}{" "}
                MB
              </div>
            </div>

            <div className="flex flex-col p-4 md:w-sm gap-2 sm:gap-4 md:p-0">
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium">Short URL</label>
                <div className="border-[1px] border-purple-600 p-2 rounded-lg flex items-center gap-3">
                  <input
                    type="text"
                    value={shortUrl}
                    className="flex-1 outline-none"
                    disabled
                  />
                  <Copy
                    className="cursor-pointer text-purple-600"
                    onClick={handleCopy}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="enablePassword"
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={enablePassword}
                    onChange={() => setEnablePassword(!enablePassword)}
                    className="size-4 rounded-xl border-[1px] accent-purple-600"
                    id="enablePassword"
                  />
                  <strong className="font-medium">Enable Password?</strong>
                </label>

                {enablePassword && (
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2 rounded-lg border-[1px] border-purple-600"
                    />
                    <button
                      onClick={handleSavePassword}
                      className="bg-purple-600 rounded-lg p-3 text-white cursor-pointer font-medium"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : "Save"}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="sendEmail" className="font-medium">
                    Send File to Email
                  </label>
                  <input
                    id="sendEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 rounded-lg border-[1px] border-purple-600"
                  />
                </div>
                <button
                  onClick={handleSendEmail}
                  disabled={isEmailSending}
                  className="bg-purple-600 p-3 text-center rounded-lg text-white font-medium cursor-pointer"
                >
                  {isEmailSending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Send Email"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center text-lg font-bold">
          No File Found !
        </div>
      )}
    </div>
  );
};

export default FilePreview;
