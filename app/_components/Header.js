"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { UserButton, UserProfile, useUser } from "@clerk/nextjs";
import { MailOpen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const router = useRouter();
  const user = useUser();
  const userDetails = user?.user?.emailAddresses[0]?.emailAddress;
  return (
    <div>
      <header className="">
        <div className="mx-auto flex h-[10vh] max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <div className="text-2xl font-bold">
            <span className="text-purple-700">Quick</span>Drive
          </div>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center font-medium gap-8 text-sm">
                <li>
                  <a
                    className="text-gray-600 transition hover:text-gray-700/75"
                    href="/"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-600 transition hover:text-gray-700/75"
                    href="/upload"
                  >
                    Upload
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-600 transition hover:text-gray-700/75"
                    href="/files"
                  >
                    Files
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-600 transition hover:text-gray-700/75"
                    href="#"
                  >
                    Plans
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              {!userDetails ? (
                <div className="sm:flex sm:gap-4">
                  <Button
                    onClick={() => router.push("/sign-in")}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <MailOpen /> Login with Email
                  </Button>
                </div>
              ) : (
                <UserButton />
              )}

              <Popover>
                <PopoverTrigger className="" asChild>
                  <Button variant="outline" className="md:hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 mr-2">
                  <div className="font-bold">
                    <ul className="flex flex-col gap-3">
                      <li>
                        <a
                          className="text-gray-600 transition hover:text-gray-700/75"
                          href="/"
                        >
                          Home
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-gray-600 transition hover:text-gray-700/75"
                          href="/upload"
                        >
                          Upload
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-gray-600 transition hover:text-gray-700/75"
                          href="/files"
                        >
                          Files
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-gray-600 transition hover:text-gray-700/75"
                          href="/"
                        >
                          Plans
                        </a>
                      </li>
                      {!userDetails && (
                        <>
                          <Separator />
                          <Button
                            onClick={() => router.push("/sign-up")}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            Register
                          </Button>
                        </>
                      )}
                    </ul>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
