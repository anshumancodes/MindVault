import { Plus, Share2 } from "lucide-react";

export default function Actionbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-sm border-b border-gray-600">
     
      <div>
        <p className="text-xl font-semibold">Vault</p>
      </div>

      
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
          <Share2 className="w-4 h-4" />
          Share Brain
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-4 h-4" />
          Add Content
        </button>
      </div>
    </div>
  );
}
