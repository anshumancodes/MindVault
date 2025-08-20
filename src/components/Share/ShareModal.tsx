import { Info, Link, X } from "lucide-react";

export default function ShareModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-full max-w-md bg-zinc-900 text-gray-200 rounded-xl shadow-xl p-5">
        
      
        <div className="flex items-center justify-between border-b border-zinc-700 pb-3 mb-4">
          <p className="text-lg font-semibold">Share Brain Memory</p>
          <button className="p-1 rounded-md hover:bg-zinc-800 transition">
            <X className="w-5 h-5 text-gray-400 hover:text-gray-200" />
          </button>
        </div>

     
        <div className="flex items-start gap-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3 mb-4">
          <Info className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-300">
            This content may include personal information. Take a moment to
            check the content before sharing the link.
          </p>
        </div>

        
        <p className="text-sm text-gray-400 mb-6">
          Changes you make after sharing won’t be updated. They’ll stay private to you.
        </p>

      
        <div className="flex items-center justify-between bg-zinc-800 border border-zinc-700 rounded-lg p-3">
          <p className="text-sm truncate text-gray-300">
            https://mindvault.in/share/
          </p>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg text-sm font-medium text-white transition">
            <Link className="w-4 h-4" />
            Create Link
          </button>
        </div>
      </div>
    </div>
  );
}
