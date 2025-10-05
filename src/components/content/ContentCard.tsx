import { Share2, FileText, Trash2, Video, Twitter } from "lucide-react";

type Tag = {
  _id: string;
  name: string;
};

type ContentCardProps = {
  title: string;
  description?: string;
  type: "docs" | "videos" | "tweets" | string;
  tags?: Tag[];
  date: string;
};

const typeIconMap: Record<string, React.ReactElement> = {
  docs: <FileText className="w-5 h-5 min-w-[20px] min-h-[20px] text-indigo-400 shrink-0" />,
  videos: <Video className="w-5 h-5 min-w-[20px] min-h-[20px] text-indigo-400 shrink-0" />,
  tweets: <Twitter className="w-5 h-5 min-w-[20px] min-h-[20px] text-indigo-400 shrink-0" />,
};

export default function ContentCard({
  title,
  description,
  type,
  tags = [],
  date,
}: ContentCardProps) {
  const icon = typeIconMap[type] || <FileText className="w-5 h-5 text-indigo-400" />;

  return (
    <div className="w-[300px] h-[220px] bg-zinc-900 rounded-xl border border-zinc-700 p-4 flex flex-col justify-between hover:border-zinc-600 hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {icon}
          <p className="font-semibold text-gray-200 line-clamp-2">{title}</p>
        </div>

        <div className="flex gap-3 text-gray-400 shrink-0">
          <button className="hover:text-indigo-400 transition">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="hover:text-red-500 transition">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description (always occupies same space [changed it so consistanst space get maintained]) */}
      <div className="text-gray-400 text-sm leading-relaxed flex-1 mt-2">
        {description ? (
          <p className="line-clamp-3">{description}</p>
        ) : (
          <p className="text-gray-600 italic">No description available.</p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-2">
        <div className="flex flex-wrap gap-2 mb-1 min-h-[28px]">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <span
                key={tag._id}
                className="bg-emerald-600/90 text-white text-xs font-medium rounded-full px-3 py-1"
              >
                #{tag.name}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-xs">No tags</span>
          )}
        </div>

        <p className="text-xs text-gray-500">
          Added on {new Date(date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
