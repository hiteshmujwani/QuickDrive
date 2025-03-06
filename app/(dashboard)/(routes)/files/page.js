"use client";

import React, { useEffect, useState } from "react";
import { File, Eye, Loader2 } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import DataTable from "./_components/DataTable";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Particles } from "@/components/magicui/particles";

const MyFiles = () => {
  const user = useUser();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getUserFiles = async () => {
    setLoading(true);
    const response = await axios.get(
      `/api/getuserfiles?user=${user?.user?.emailAddresses[0]?.emailAddress}`
    );
    if (response.data.success) {
      setFiles(response.data.files);
      setLoading(false);
    }
  };

  const handleView = (file) => {
    router.push(`/file-preview/${file.fileId}`);
  };

  useEffect(() => {
    if (files.length == 0) {
      if (user) {
        getUserFiles();
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      {loading ? (
        <div className=" w-full flex justify-center items-center bg-white">
          <Loader2 className="animate-spin" size={50} />
        </div>
      ) : (
        <DataTable files={files} />
      )}

      <Particles
        className="z-[-1] absolute top-0 left-0 h-full w-full"
        quantity={300}
      />
    </div>
  );
};

export default MyFiles;
