"use client";
import { Funnel, Plus, Share2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCreateContentModal,useShareModal  } from "@/context/Content.store";

export default function Actionbar() {
  const openCreateModal = useCreateContentModal((state) => state.openModal);
  const openShareModal = useShareModal((state) => state.openModal);

  return (
    <div className="flex flex-wrap justify-between items-center px-6 py-4 shadow-sm border-b border-gray-600 gap-3">
      <div className="flex items-center gap-8">
        <p className="text-xl font-semibold">Vault</p>
        {/* Filter */}
        <div className="flex items-center gap-2 px-4 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          {" "}
          <Funnel className="w-4 h-4 text-gray-700" />{" "}
          <Select defaultValue="">
            {" "}
            <SelectTrigger className="w-fit bg-transparent border-0 text-sm text-gray-700">
              {" "}
              <SelectValue placeholder="All Content" />{" "}
            </SelectTrigger>{" "}
            <SelectContent>
              {" "}
              <SelectItem value="all">All Content </SelectItem>{" "}
              <SelectItem value="docs">Docs</SelectItem>{" "}
              <SelectItem value="tweets">Tweets</SelectItem>{" "}
              <SelectItem value="videos">Videos</SelectItem>{" "}
            </SelectContent>{" "}
          </Select>{" "}
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        onClick={openShareModal} 
        >
          <Share2 className="w-4 h-4" />
          Share Brain
        </button>

        <button
          className="flex items-center gap-2 px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={openCreateModal}
        >
          <Plus className="w-4 h-4" />
          Add Content
        </button>
      </div>
    </div>
  );
}
