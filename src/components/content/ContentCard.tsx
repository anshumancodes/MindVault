import { Share2, FileText, Trash2 } from "lucide-react";
{
  /* dummy  Content  will be replaced by api rendered content*/
}
export default function ContentCard() {
  return (
    <div className="w-[300px] bg-zinc-900 rounded-xl border border-zinc-700 p-4 flex flex-col gap-4 hover:border-zinc-600 hover:shadow-lg transition">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <p className="font-semibold text-gray-200">Project Ideas</p>
        </div>

        <div className="flex gap-3 text-gray-400">
          <button className="hover:text-indigo-400 transition">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="hover:text-red-500 transition">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-gray-400 text-sm leading-relaxed">
        <p>
          Mauris in purus magna. Ut pretium augue diam, id egestas nisi
          dignissim iaculis. Mauris porta venenatis vulputate. Mauris semper
          tellus augue, at facilisis nibh gravida id. Aenean erat est, malesuada
          non diam non, ultrices egestas mi. Vestibulum vitae urna quis justo
          elementum posuere et non diam. Nulla pharetra tellus ut ullamcorper
          aliquam. Morbi metus risus, tincidunt id rutrum ac,
        </p>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-1">
        <span className="bg-emerald-600/90 text-white text-xs font-medium rounded-full px-3 py-1 w-fit">
          #productivity
        </span>
        <p className="text-xs text-gray-500">Added on 10/3/2025</p>
      </div>
    </div>
  );
}
