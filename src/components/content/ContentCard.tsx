import { Twitter, FileText, Video, Share2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

type Tag = { _id: string; title: string };

type ContentCardProps = {
  title: string;
  description?: string;
  type: "docs" | "videos" | "tweets" | string;
  tags?: Tag[];
  date: string;
  postid: string;
  link: string;
};

const typeIconMap: Record<string, React.ReactElement> = {
  docs: <FileText className="w-5 h-5 min-w-[20px] text-indigo-400 shrink-0" />,
  videos: <Video className="w-5 h-5 min-w-[20px] text-indigo-400 shrink-0" />,
  tweets: <Twitter className="w-5 h-5 min-w-[20px] text-indigo-400 shrink-0" />,
};

function getYouTubeId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function ContentCard({
  title,
  description,
  type,
  tags = [],
  date,
  postid,
  link,
}: ContentCardProps) {
  const icon = typeIconMap[type] || (
    <FileText className="w-5 h-5 text-indigo-400" />
  );

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/v1/content/delete", {
        method: "POST",
        body: JSON.stringify({ contentId: postid }),
      });
    } catch (error) {
      console.error("Unexpected fetch error:", error);
    }
  };

  const videoId = type === "videos" ? getYouTubeId(link) : null;
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  return (
    <Link href={link}>
      <motion.div
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 0px 25px rgba(99, 102, 241, 0.25)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="w-[350px] h-[270px] bg-zinc-900 hover:bg-zinc-800/80 rounded-xl border border-zinc-800 p-4 flex flex-col justify-between transition-all duration-200 hover:border-indigo-500/40 overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {icon}
            <p className="font-semibold text-gray-200 line-clamp-2">{title}</p>
          </div>

          <div className="flex gap-3 text-gray-400 shrink-0">
            <button
              className="hover:text-indigo-400 transition"
              onClick={(e) => e.preventDefault()}
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              className="hover:text-red-500 transition"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Description / Video */}
        {type === "videos" && thumbnail ? (
          <div className="relative w-full aspect-video max-h-[120px] rounded-lg overflow-hidden mt-2 flex-shrink-0">
            <img
              src={thumbnail}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <Video className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-sm leading-relaxed flex-1 mt-2">
            {description ? (
              <p className="line-clamp-3">{description}</p>
            ) : type === "tweets" ? (
              <p className="line-clamp-3">Click to view on Twitter</p>
            ) : (
              <p className="text-gray-600 italic">No description available.</p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-2">
          <div className="flex flex-wrap gap-2 mb-1 min-h-[28px]">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <motion.span
                  key={tag._id}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgb(99,102,241)",
                    boxShadow: "0px 0px 12px rgba(99,102,241,0.4)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="bg-indigo-600/50 text-white text-xs font-medium rounded-full px-3 py-1 transition-all cursor-default"
                >
                  #{tag.title}
                </motion.span>
              ))
            ) : (
              <span className="text-gray-500 text-xs">No tags</span>
            )}
          </div>

          <p className="text-xs text-gray-500">
            Added on {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
