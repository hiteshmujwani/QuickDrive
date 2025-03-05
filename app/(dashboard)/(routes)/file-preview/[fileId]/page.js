"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FilePreviewContainer from "./_components/FilePreviewContainer";
import { Copy } from "lucide-react";

const FilePreview = () => {
  const { fileId } = useParams();
  const [file, setFile] = useState({});
  const [enablePassword, setEnablePassword] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const fetchFile = async () => {
    const response = await axios.get(`/api/getfiledoc?fileId=${fileId}`);
    if (response.data.success) {
      setFile(response.data.file);
      setPassword(response.data.file.password);
    }
  };

  const handleSendEmail = async () => {
    const response = await axios.post(
      "/api/send-email",
      {
        toEmail: "hiteshmujwani@gmail.com",
        fileUrl: file.fileUrl,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = await response.data;
    console.log(data);
  };

  const handleSavePasword = async () => {
    if (password.trim() == "") {
      alert("Please enter password");
      return;
    }

    const response = await axios.post(`/api/updatefiledoc`, {
      password,
      fileId,
    });

    if (response.data.success) {
      alert("password saved");
    }
  };

  const handleCopy = async () => {
    await navigator?.clipboard?.writeText(file?.shortUrl);
  };

  useEffect(() => {
    if (fileId) {
      fetchFile();
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-10vh)] ">
      <div className="flex xl:flex-row flex-col xl:gap-6 items-center">
        <div className=" bg-gray-50 flex flex-col justify-center items-center rounded-lg  p-6 gap-1   ">
          <FilePreviewContainer
            fileUrl={file.fileUrl}
            fileType={file.fileFormat}
          />
          <div className="text-center">{file.fileName}</div>
          <div>
            {file.fileFormat} / {(file.fileSize / 1000 / 1000).toFixed(2)} MB
          </div>
        </div>
        <div className="flex flex-col w-sm gap-2 sm:gap-4 p-6 sm:p-0">
          <div className="flex flex-col gap-1">
            <label className="text-base font-medium">Short Url</label>
            <div className="border-[1px] border-purple-600 p-2 rounded-lg flex items-center gap-3">
              <input
                value={file.shortUrl}
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
              htmlFor="Option1"
              className="flex cursor-pointer items-center gap-2"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value={enablePassword}
                  onChange={(e) => setEnablePassword(!enablePassword)}
                  className="size-4 rounded-xl border-[1px]  accent-purple-600"
                  id="Option1"
                />
              </div>

              <div>
                <strong className="font-medium"> Enable Password ?</strong>
              </div>
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
                  onClick={handleSavePasword}
                  className="bg-purple-600 rounded-lg p-3 text-white cursor-pointer font-medium"
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="sendEmail" className="font-medium">
                Send File To Email
              </label>
              <input
                id="sendEmail"
                type="email"
                className="w-full p-2 rounded-lg border-[1px] border-purple-600"
              />
            </div>
            <button
              onClick={handleSendEmail}
              className="bg-purple-600 p-3 rounded-lg text-white font-medium"
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
