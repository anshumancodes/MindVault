"use client";
import { Info, Link as LinkIcon, X, Copy } from "lucide-react";
import { useShareModal } from "@/context/Context.store";
import { useState } from "react";

export default function ShareModal() {
  const isOpen = useShareModal((s) => s.isOpen);
  const closeModal = useShareModal((s) => s.closeModal);

  const [shareLink, setShareLink] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShareFunction = async () => {
    setLoading(true);
    setError(false);
    setCopied(false);

    try {
      const res = await fetch("/api/v1/link/create", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to get or create share link:", data.message);
        setError(true);
        return;
      }

      
      setShareLink(data.shareUrl);

      console.log(
        res.status === 200
          ? "Existing link found!"
          : "New link created successfully!",
        data.shareUrl
      );
    } catch (err) {
      console.error("Error in sharing URL:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shareLink) return;
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-full max-w-md bg-zinc-900 text-gray-200 rounded-xl shadow-xl p-5">
       
        <div className="flex items-center justify-between border-b border-zinc-700 pb-3 mb-4">
          <p className="text-lg font-semibold">Share Brain Memory</p>
          <button
            className="p-1 rounded-md hover:bg-zinc-800 transition"
            onClick={closeModal}
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-200" />
          </button>
        </div>

       
        <div className="flex items-start gap-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3 mb-4">
          <Info className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-300">
            This content may include personal information. Check before sharing.
          </p>
        </div>

        <p className="text-sm text-gray-400 mb-6">
          Changes you make after sharing won’t be updated. They’ll stay private
          to you.
        </p>

        {/* Link Section */}
        <div className="flex flex-col gap-3 bg-zinc-800 border border-zinc-700 rounded-lg p-3">
          <p className="text-sm text-gray-300">
            Share your second brain with others!
          </p>

          {error ? (
            <p className="text-red-300 text-sm">
              Error generating link , please try again!.
            </p>
          ) : loading ? (
            <p className="text-gray-400 text-sm">Generating share link...</p>
          ) : shareLink ? (
            <div className="flex items-center justify-between gap-2">
              <a
                href={shareLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 underline break-all text-sm flex-1"
              >
                {shareLink}
              </a>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded-md border border-zinc-700 hover:bg-zinc-700 transition"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No link generated yet.</p>
          )}

          <button
            onClick={handleShareFunction}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded-lg text-sm font-medium text-white transition disabled:opacity-50"
          >
            <LinkIcon className="w-4 h-4" />
            {loading ? "Creating..." : "Create link"}
          </button>
        </div>
      </div>
    </div>
  );
}
