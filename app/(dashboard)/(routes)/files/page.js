"use client";

import React, { useEffect, useState } from "react";
import { File, Eye } from "lucide-react";
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
  const router = useRouter();

  const getUserFiles = async () => {
    const response = await axios.get(
      `/api/getuserfiles?user=${user?.user?.emailAddresses[0]?.emailAddress}`
    );
    if (response.data.success) {
      setFiles(response.data.files);
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
      {/* <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 md:p-6 bg-gray-100 border-b">
          <h2 className="text-xl font-semibold text-gray-800">My Files</h2>
          <p className="text-gray-500 text-sm">Total Files: {files.length}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                {["File Name", "Type", "Size", ""].map((header) => (
                  <th
                    key={header}
                    className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {files.map((file) => (
                <tr
                  key={file.fileId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 flex items-center space-x-3">
                    <File className="w-6 h-6 text-blue-500" />
                    <span className="font-medium text-gray-800">
                      {file.fileName}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {file.fileFormat}
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                    {(file.fileSize / 1000 / 1000).toFixed(2)} MB
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleView(file)}
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
      <DataTable files={files} />
      <Particles
        className="z-[-1] absolute top-0 left-0 h-full w-full"
        quantity={300}
      />
    </div>
  );
};

export default MyFiles;
