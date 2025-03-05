"use client";
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
    const response = await axios.get(`/api/getfiledoc?fileId=${fileId}`);
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

    console.log(file);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8 text-center">
        <h2 className="text-blue-600 text-xl font-semibold mb-4">
          {file.user} Shared the file with You
        </h2>

        <div className="flex justify-center mb-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <FileDown className="w-16 h-16 text-blue-500 mx-auto" />
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
          className="w-full bg-blue-600 text-white py-3 disabled:bg-gray-300 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download
        </button>

        <p className="text-xs text-gray-500 mt-2">*Term and Condition apply</p>
      </div>
    </div>
  );
};

export default F;
