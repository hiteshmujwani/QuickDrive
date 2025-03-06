"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Download, Eye, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const ActionPopup = ({ children, file }) => {
  const router = useRouter();

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

  const shareOnWhatsApp = (url) => {
    const message = `Check out this file: ${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild className="flex">
          <Button variant="ghost">{children}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2 mr-12">
          <div className="text-base font-medium flex flex-col gap-3">
            <div
              onClick={() => router.push(`/file-preview/${file.fileId}`)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div>
                <Eye />
              </div>
              <div>Preview</div>
            </div>
            <Separator />
            <div
              onClick={handleDownload}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div>
                <Download />
              </div>
              <div>Download</div>
            </div>
            <Separator />
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => shareOnWhatsApp(file.shortUrl)}
            >
              <div>
                <Send />
              </div>
              <div>Share</div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ActionPopup;
