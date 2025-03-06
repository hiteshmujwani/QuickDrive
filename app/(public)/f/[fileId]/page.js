"use client";
import { GET_FILE_PUBLIC } from "@/app/constant/ApiUrls";
import { Particles } from "@/components/magicui/particles";
import axios from "axios";
import { FileDown } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const F = () => {
  const { fileId } = useParams();
  const [file, setFile] = useState({});
  const [password, setPassword] = useState("");
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

  const fetchFile = async () => {
    const response = await axios.get(`${GET_FILE_PUBLIC}?fileId=${fileId}`);
    if (response.data.success) {
      setFile(response.data.file);
    }
  };

  const handleDownload = () => {
    const modifiedUrl = file.fileUrl.replace(
      "/upload/",
      "/upload/fl_attachment:"
    );
    const downloadElement = document.createElement("a");
    downloadElement.href = modifiedUrl;
    downloadElement.download = file.fileName || "download";
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
  };

  const handlePasswordMatch = (e) => {
    const passwordInput = e.target.value;
    setIsPasswordMatched(passwordInput === file.password);
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (fileId) {
      fetchFile();
    }
  }, []);

  return (
    <>
      <Particles
        quantity={200}
        className="absolute z-[-1] h-full w-full top-0 left-0"
      />
      <div className="h-full  flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8 text-center">
          <h2 className="text-purple-600 text-xl font-semibold mb-4">
            {file.user} Shared the file with You
          </h2>

          <div className="flex justify-center mb-6">
            <div className="bg-purple-50 p-6 rounded-lg">
              <FileDown className="w-16 h-16 text-purple-500 mx-auto animate-bounce" />
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 font-medium">
              <span className="font-bold">{file.fileName}</span> ⚡{" "}
              {file.fileFormat} ⚡
              {(file.fileSize / 1000 / 1000).toFixed(2) + " MB"}
            </p>
          </div>
          {file?.password?.length > 0 && (
            <input
              type="password"
              placeholder="Enter password to access"
              value={password}
              onChange={(e) => handlePasswordMatch(e)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <button
            disabled={file.password?.length > 0 && isPasswordMatched == false}
            onClick={handleDownload}
            className="w-full bg-purple-600 text-white py-3 disabled:bg-gray-300 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Download
          </button>

          <p className="text-xs text-gray-500 mt-2">
            *Term and Condition apply
          </p>
        </div>
      </div>
    </>
  );
};

export default F;
