"use client";

import Image from "next/image";
import React, { useState } from "react";
import FileUploadButton from "./FileUploadButton";
import { getStorage, ref } from "firebase/storage";
import { app } from "../../../../../firebaseConfig";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { toast } from "sonner";
import { UPLOAD_FILE } from "@/app/constant/ApiUrls";

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const user = useUser();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleUploadFile = async (e) => {
    const file = selectedFile;
    if (!file) return;
    setIsUploading(true);
    const uploadedData = await uploadFileWithProgress(file, (percent) => {
      setProgress(percent); // Update progress state
    });

    const bodyData = {
      fileName: selectedFile?.name,
      fileFormat: selectedFile?.type,
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/f/${uploadedData.public_id}`,
      fileId: uploadedData.public_id,
      user: user.user.emailAddresses[0].emailAddress,
      fileSize: uploadedData.bytes,
      fileUrl: uploadedData.secure_url,
      password: "",
    };

    const response = await axios.post(UPLOAD_FILE, {
      ...bodyData,
    });

    if (response.data.success) {
      console.log(response.data);
      setIsUploading(false);
      setSelectedFile("");
      setProgress(0);
      toast.success("File uploaded successfully", { position: "top-center" });
      router.push(`/file-preview/${response.data.createdFile.fileId}`);
    } else {
      setIsUploading(false);
    }
  };

  const uploadFileWithProgress = async (file, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "File_Preset");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dtje2rtke/upload",
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        },
      }
    );
    console.log(response.data);
    return response.data;
  };
  return (
    <div className="flex flex-col gap-6 justify-center items-center px-6 ">
      <div className="flex  items-center justify-center lg:w-3xl w-full">
        {isUploading ? (
          <div className="bg-white w-full border p-5 rounded-lg">
            <AnimatedCircularProgressBar
              max={100}
              min={0}
              value={progress}
              gaugePrimaryColor="rgb(79 70 229)"
              gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
              className="h-[100px] w-full"
            />
          </div>
        ) : (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 hover:border-gray-600 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-10 h-10 mb-2 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-gray-600 dark:text-gray-500 md:text-2xl text-xl text-center">
                {selectedFile ? (
                  <span className="font-semibold">{selectedFile?.name}</span>
                ) : (
                  <span className="font-semibold">
                    Click to upload or drag and drop
                  </span>
                )}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
                {selectedFile
                  ? (selectedFile.size / 1000 / 1000).toFixed(2) + " MB"
                  : "Any File Maximum Size 2 MB"}
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>
      {selectedFile && (
        <div className="flex bg-gray-100 p-4 w-full lg:w-3xl rounded-lg gap-2">
          <div className="w-20 hidden lg:flex">
            <Image
              src={"/FileDetails.svg"}
              height={100}
              width={100}
              alt="file"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="sm:text-lg text-xs font-bold text-gray-600">
              File Name :- {selectedFile?.name}
            </p>
            <p className="sm:text-lg text-xs font-bold text-gray-600 ">
              File Type :- {selectedFile?.type}
            </p>
            <p className="sm:text-lg text-xs font-bold text-gray-600 ">
              File Size :-{" "}
              {(selectedFile?.size / 1000 / 1000).toFixed(2) + " MB"}
            </p>
          </div>
        </div>
      )}

      <FileUploadButton
        disabled={selectedFile && !isUploading ? false : true}
        uploadFile={handleUploadFile}
        // progress={progress}
        // isUploading={isUploading}
      />
    </div>
  );
};

export default FileUploadForm;
