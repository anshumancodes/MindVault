"use client";
import { Menu, Funnel, Plus, Share2, Brain } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useCreateContentModal,
  useShareModal,
  useOpenSidebar,
  useContentFilter,
} from "@/context/Context.store";

export default function Actionbar() {
  const openCreateModal = useCreateContentModal((state) => state.openModal);
  const openShareModal = useShareModal((state) => state.openModal);
  const openSidebar = useOpenSidebar((state) => state.openSidebar);
  const { filter, setFilter } = useContentFilter();

  return (
    <header className="bg-neutral-900 border-b border-neutral-800 p-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Hamburger + Logo (mobile) / Filter (desktop) */}
        <div className="flex items-center gap-3">
          <button
            onClick={openSidebar}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="md:hidden flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-200">Vault</span>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700">
            <Funnel className="w-4 h-4 text-gray-400" />
            <Select value={filter} onValueChange={(val) => setFilter(val)}>
              <SelectTrigger className="w-fit bg-transparent border-0 text-sm text-gray-300 focus:ring-0">
                <SelectValue placeholder="All Content" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 border-neutral-700 text-gray-200">
                <SelectItem value="all">All Content</SelectItem>
                <SelectItem value="docs">Docs</SelectItem>
                <SelectItem value="tweets">Tweets</SelectItem>
                <SelectItem value="videos">Videos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={openShareModal}
            className="px-3 sm:px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm font-medium text-gray-200 transition-colors flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share Brain</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Content</span>
          </button>
        </div>
      </div>
    </header>
  );
}
