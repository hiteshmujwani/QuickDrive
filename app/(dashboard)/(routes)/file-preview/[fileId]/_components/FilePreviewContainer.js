import Image from "next/image";
import React from "react";

const FilePreviewContainer = ({ fileUrl, fileType }) => {
  if (!fileUrl) return <p>No file to preview</p>;

  // Check file type and return preview
  if (fileType.startsWith("image/")) {
    return (
      <Image
        src={fileUrl}
        alt="File Preview"
        width={300}
        height={200}
        className="object-contain h-[200px] w-[300px]"
      />
    );
  }

  if (fileType.startsWith("video/")) {
    return <video src={fileUrl} controls className="h-[200px] w-[300px]" />;
  }

  if (fileType.startsWith("audio/")) {
    return <audio src={fileUrl} controls />;
  }

  if (fileType === "application/pdf") {
    return <iframe src={fileUrl} className="w-full " />;
  }

  if (
    fileType === "application/msword" || // .doc
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // .docx
    fileType === "application/vnd.ms-excel" || // .xls
    fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
    fileType === "application/vnd.ms-powerpoint" || // .ppt
    fileType ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" // .pptx
  ) {
    return (
      <iframe
        src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
        className="w-full h-[500px]"
      />
    );
  }

  // For text files
  if (fileType.startsWith("text/") || fileType === "application/json") {
    return <iframe src={fileUrl} className="w-full h-[500px] border p-2" />;
  }

  // Default (unknown file types)
  return (
    <a href={fileUrl} download className="text-blue-500 underline">
      Download File
    </a>
  );
};

export default FilePreviewContainer;
