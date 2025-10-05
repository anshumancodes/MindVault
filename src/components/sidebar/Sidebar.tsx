"use client";

import { ChevronDown, X } from "lucide-react";
import { useUserModal, useOpenSidebar } from "@/context/Context.store";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { openModal } = useUserModal();
  const { isOpen, closeSidebar } = useOpenSidebar();
  const { data: session, status } = useSession();

  // Close sidebar when pressing Escape (wasnt nesccary byt hey)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeSidebar]);
  const user = session?.user;
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-full md:h-screen w-64 md:w-[300px]
          bg-neutral-900 border-r border-neutral-800
          flex flex-col py-6 px-6
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Close Button (mobile only) */}
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-gray-400 hover:text-white md:hidden"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Top Branding */}
        <div className="flex items-center justify-start gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">MindVault</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 px-2 mt-10 text-gray-300">
          <button className="text-left hover:text-white transition">
            Vault
          </button>
          <button className="text-left hover:text-white transition">
            Brainboard
          </button>
        </nav>

        {/* Profile Section */}
        <div
          onClick={openModal}
          className="mt-auto border-t border-neutral-800 px-3 py-3 flex items-center justify-between cursor-pointer hover:bg-neutral-800 transition rounded-lg"
        >
          {/* Avatar + Info */}
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 text-gray-800 font-medium px-2 py-2 rounded-full flex items-center justify-center h-[40px] w-[40px]">
              {user?.name
                ? user.name
                    .split(" ") // Splits whatever string / full name into parts
                    .slice(0, 2) // Take first two (e.g., first + last)
                    .map((word) => word[0]?.toUpperCase()) // then Get first letter of each aray
                    .join("") // Combine into initials
                : "U"}{" "}
                {/* default is "U" basically */}
            </div>

            <div className="flex flex-col leading-tight">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>

        
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </aside>
    </>
  );
}
