"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import DataTable from "./_components/DataTable";
import { Particles } from "@/components/magicui/particles";
import { GET_USER_FILES } from "@/app/constant/ApiUrls";

const MyFiles = () => {
  const { user, isLoaded } = useUser();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUserFiles = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const email = user?.emailAddresses?.[0]?.emailAddress;
      if (!email) throw new Error("User email not found.");

      const response = await axios.get(`${GET_USER_FILES}?user=${email}`);

      if (response.data.success) {
        setFiles(response.data.files);
      } else {
        console.log("Error fetching files:", response.data.message);
      }
    } catch (error) {
      console.log("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isLoaded) getUserFiles();
  }, [isLoaded, getUserFiles]);

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      {loading ? (
        <div className="w-full flex justify-center items-center bg-white">
          <Loader2 className="animate-spin" size={50} />
        </div>
      ) : files.length > 0 ? (
        <DataTable files={files} />
      ) : (
        <div className="text-center text-lg font-bold">No files found.</div>
      )}

      <Particles
        className="z-[-1] absolute top-0 left-0 h-full w-full"
        quantity={300}
      />
    </div>
  );
};

export default MyFiles;
