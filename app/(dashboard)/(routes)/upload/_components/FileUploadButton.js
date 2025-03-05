"use client";
import React from "react";

function FileUploadButton({ uploadFile, progress, isUploading }) {
  return (
    <div className="w-full cursor-pointer">
      <div className="relative w-full h-8 text-center">
        {isUploading ? (
          <div
            style={{ width: `${progress}` }}
            className={`absolute top-0 left-0 text-xl font-bold text-white flex justify-center items-center   bg-purple-600 p-3 border-black border h-full z-[-10] rounded-lg`}
          >
            {progress}
          </div>
        ) : (
          <div
            onClick={uploadFile}
            className="text-xl font-bold text-white p-3  rounded-lg  border-black border bg-purple-600"
          >
            Upload
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUploadButton;
