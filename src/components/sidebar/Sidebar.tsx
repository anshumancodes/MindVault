import { ChevronDown, LogOut, Settings, ArrowUpCircle } from "lucide-react";
import { useUserModal } from "@/context/Content.store";
export default function Sidebar() {
  const { openModal } = useUserModal();
  return (
    <div className="flex flex-col py-6 px-8 max-w-[300px] border-r border-gray-600 h-screen">
      {/* Top Branding */}
      <div>
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
          <h1 className="text-2xl font-bold">MindVault</h1>
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex flex-col gap-6 px-2 mt-10">
        <p>Vault</p>
        <p>Brainboard</p>
      </div>

      {/* Push profile section to bottom */}
      <div
      onClick={openModal}
      className="mt-auto border-t border-gray-700 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-800 transition rounded-lg"
    >
      {/* Avatar + Info */}
      <div className="flex items-center gap-3">
        <div className="bg-gray-200 text-gray-800 font-medium px-3 py-2 rounded-full">
          UN
        </div>
        <div className="flex flex-col leading-tight">
          <p className="text-sm font-medium text-white">Username</p>
          <p className="text-xs text-gray-400">anshumanprof01@gmail.com</p>
        </div>
      </div>

      {/* Dropdown Icon */}
      <ChevronDown className="w-4 h-4 text-gray-400" />
    </div>
    </div>
  );
}
