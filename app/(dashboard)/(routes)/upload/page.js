import React from "react";
import FileUploadForm from "./_components/FileUploadForm";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Particles } from "@/components/magicui/particles";

const Upload = () => {
  return (
    <div className="h-full">
      <div className="flex flex-col">
        <FileUploadForm />
      </div>
      {/* <DotPattern className="z-[-1]" /> */}
      <Particles
        className="z-[-1] absolute top-0 left-0 h-full w-full"
        quantity={200}
      />
    </div>
  );
};

export default Upload;
