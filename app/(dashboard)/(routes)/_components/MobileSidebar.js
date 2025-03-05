"use client";

import { File, Shield, Upload, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const MobileSidebar = ({ setShowSideBar }) => {
  const path = usePathname();
  const sideBarMenuList = [
    {
      name: "Upload",
      icon: Upload,
      path: "/upload",
    },
    {
      name: "Files",
      icon: File,
      path: "/files",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/upgrade",
    },
  ];

  const isActive = (name) => {
    if (path.slice(1) == name.slice(1)) return true;
  };
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="text-3xl font-bold p-5 flex justify-between items-center">
          <div>
            <span className="text-purple-700">Quick</span>Drive
          </div>
          <div className="md:hidden">
            <X size={28} onClick={() => setShowSideBar(false)} />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col">
            {sideBarMenuList.map((menuItem) => (
              <Link
                href={menuItem.path}
                key={menuItem.name}
                className={`flex gap-2 items-center hover:bg-purple-100 px-6 py-4 ${
                  isActive(menuItem.path) ? "bg-purple-100" : null
                }`}
                onClick={() => {
                  setShowSideBar(false);
                }}
              >
                <menuItem.icon
                  className={` ${
                    isActive(menuItem.path)
                      ? "text-purple-700"
                      : "text-gray-500"
                  }`}
                />
                <div
                  className={`text-lg ${
                    isActive(menuItem.path)
                      ? "text-purple-700"
                      : "text-gray-600"
                  }`}
                >
                  {menuItem.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
