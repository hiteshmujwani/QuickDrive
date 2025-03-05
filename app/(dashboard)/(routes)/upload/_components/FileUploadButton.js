"use client";
import { Button } from "@/components/ui/button";
import React from "react";

function FileUploadButton({ uploadFile, progress, isUploading, disabled }) {
  return (
    <div className="lg:w-3xl w-full cursor-pointer">
      <div className="relative w-full h-8 text-center">
        {isUploading ? (
          <div
            style={{ width: `${progress}` }}
            className={`absolute top-0 left-0 text-xl font-bold text-white flex justify-center items-center   bg-purple-600 p-3  h-full z-[-10] rounded-lg`}
          >
            {progress}
          </div>
        ) : (
          <Button
            disabled={disabled}
            onClick={uploadFile}
            className="text-xl font-bold text-white p-6 w-full disabled:bg-gray-500 disabled:opacity-100  rounded-lg  bg-purple-600"
          >
            Upload
          </Button>
        )}
      </div>
    </div>
  );
}

export default FileUploadButton;
