"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileText } from "lucide-react";
import { useTextcontentModal } from "@/context/Context.store";

export default function TextContentModal() {
  const { isOpen, content, closeModal } = useTextcontentModal();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, closeModal]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && content && (
        <motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-zinc-900 border border-zinc-700/60 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* ── Header ── */}
            <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-zinc-800 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="p-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 shrink-0">
                  <FileText className="w-4 h-4 text-indigo-400" />
                </span>
                <h2 className="text-lg font-semibold text-gray-100 leading-snug line-clamp-2">
                  {content.title}
                </h2>
              </div>

              <button
                onClick={closeModal}
                className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ── Scrollable Body ── */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
              {content.description ? (
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {content.description}
                </p>
              ) : (
                <p className="text-gray-500 italic text-sm">
                  No content available.
                </p>
              )}
            </div>

            {/* ── Footer ── */}
            <div className="shrink-0 px-6 py-4 border-t border-zinc-800 flex items-center justify-between gap-4 flex-wrap">
              {/* Tags + Date */}
              <div className="flex flex-col gap-1.5">
                {content.tags && content.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {content.tags.map((tag) => (
                      <span
                        key={tag._id}
                        className="bg-indigo-600/30 text-indigo-300 text-xs font-medium rounded-full px-2.5 py-0.5 border border-indigo-500/30"
                      >
                        #{tag.title}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Added on {new Date(content.date).toLocaleDateString()}
                </p>
              </div>

              {/* Open Link Button */}
              {content.link && (
                <a
                  href={content.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Link
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
