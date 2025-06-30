import { Share2Icon, Plus, Filter } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-2 border-b">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
        <Filter className="w-5 h-5" />
        <select
          name="type of content"
          className="text-sm rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="">All</option>
          <option value="videos">Videos</option>
          <option value="documents">Documents</option>
          <option value="tweets">Tweets</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-200 transition">
          <Share2Icon className="w-4 h-4" />
          Share Brain
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition">
          <Plus className="w-4 h-4" />
          Add Content
        </button>
      </div>
    </nav>
  );
}

