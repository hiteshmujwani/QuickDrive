"use client";

import React from "react";
import Sidebar from "./_components/Sidebar";
import TopBar from "./_components/TopBar";

const layout = ({ children }) => {
  return (
    <div>
      <div className="fixed border-r border-gray-600 h-full w-64 hidden md:flex">
        <Sidebar />
      </div>
      <div className="md:ml-64">
        <div className="border-b border-gray-600">
          <TopBar />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default layout;
