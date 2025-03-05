"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { use, useEffect } from "react";

const Files = () => {
  const user = useUser();

  useEffect(() => {
    user && console.log(user.user?.id);
  }, [user]);
  return <div className="flex justify-center items-center h-full">Files</div>;
};

export default Files;
