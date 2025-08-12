import { ChevronDown, LogOut, Settings, ArrowUpCircle } from "lucide-react";

export default function Sidebar() {
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
      <div className="mt-auto border-t border-gray-600 flex gap-2 items-center py-4">
        <div className="bg-[#f5f5f5] text-[#191516] px-2 py-2 rounded-full">
          <p>UN</p>
        </div>
        <span className="flex gap-1 items-center">
          <p>Username</p>
          <ChevronDown className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}

function ProfileModal() {
  return (
    <div className="p-4 bg-white shadow-lg rounded-md w-48">
      <p className="text-sm text-gray-500 mb-2">username@email.com</p>
      <button className="flex items-center gap-2 text-sm hover:bg-gray-100 p-2 rounded-md w-full">
        <ArrowUpCircle className="w-4 h-4" /> Upgrade plan
      </button>
      <button className="flex items-center gap-2 text-sm hover:bg-gray-100 p-2 rounded-md w-full">
        <Settings className="w-4 h-4" /> Settings
      </button>
      <hr className="my-2 border-gray-300" />
      <button className="flex items-center gap-2 text-sm hover:bg-gray-100 p-2 rounded-md w-full text-red-600">
        <LogOut className="w-4 h-4" /> Logout
      </button>
    </div>
  );
}
