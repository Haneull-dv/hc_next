"use client";
import React from "react";
import Link from "next/link";
import { useSidebar } from "../SidebarContext";

const Header = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <header className="bg-white shadow-sm h-16 fixed top-0 right-0 left-0 z-20">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200 flex items-center justify-center"
            aria-label="메뉴 열기/닫기"
          >
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link href="/" className="ml-4 text-lg font-semibold text-cyan-500">
            Conan<span className="text-blue-500">AI</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* 헤더 우측 아이템들 */}
        </div>
      </div>
    </header>
  );
};

export default Header; 