import { UserButton, UserProfile } from "@clerk/nextjs";
import { MenuIcon, MenuSquareIcon } from "lucide-react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";

const TopBar = () => {
  const [showSidebar, setShowSideBar] = useState(false);
  return (
    <div className="p-5 flex justify-between">
      <div
        className={`fixed border-r border-gray-600 h-full w-64 top-0 bg-white duration-500 ${
          showSidebar ? "left-0" : "left-[-256px]"
        } md:hidden`}
      >
        <div className="md:hidden">
          <MobileSidebar setShowSideBar={setShowSideBar} />
        </div>
      </div>
      <div className="md:hidden" onClick={() => setShowSideBar(!showSidebar)}>
        <MenuIcon size={35} />
      </div>
      <div className="text-2xl font-bold text-center md:hidden">
        <span className="text-purple-700">Quick</span>Drive
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
