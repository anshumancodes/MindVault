"use client";

import { useEffect, useState } from "react";
import Actionbar from "@/components/Actionbar/Actionbar";
import ContentCard from "@/components/content/ContentCard";
import CreateModal from "@/components/content/CreateModal";
import ShareModal from "@/components/Share/ShareModal";
import Sidebar from "@/components/sidebar/Sidebar";
import UserModal from "@/components/sidebar/UserModal";
import Settings from "@/components/Settings/Settings";
import { SessionProvider } from "next-auth/react";
import { useContentFilter } from "@/context/Context.store";
import CardsSkeleton from "@/components/content/ContentCardSkeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRefreshVault, useSearchState } from "@/context/Context.store";
import { SearchResult } from "@/types/search";
import AuthWrapper from "@/lib/Auth";

type Content = {
  _id: string;
  title: string;
  link: string;
  type: string;
  description?: string;
  tags?: { _id: string; title: string }[];
  createdAt: string;
  postid?: string;
};

export default function Mind() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { filter, refreshTrigger } = useContentFilter();
  const { refetch } = useRefreshVault();
  const { search, searchResult } = useSearchState();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/v1/content/fetch/all");

        if (!res.ok) {
          const errText = await res.text();
          console.error("Fetch failed:", res.status, errText);
          setContents([]); // Prevent crash if response invalid
          return;
        }

        const data = await res.json();

        setContents(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Unexpected fetch error:", error);
        setContents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [refreshTrigger, refetch]);

  // Calculate top 5 hashtags
  const tagCounts: Record<string, number> = {};
  contents.forEach((content) => {
    content.tags?.forEach((tag) => {
      tagCounts[tag.title] = (tagCounts[tag.title] || 0) + 1;
    });
  });

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([title]) => title);

  const filteredContents =
    filter === "all"
      ? contents
      : contents.filter((c) => c.type?.toLowerCase() === filter.toLowerCase());

  let displayContents: (Content | SearchResult)[] = search ? searchResult : filteredContents;

  if (selectedTag) {
    displayContents = displayContents.filter((c) =>
      c.tags?.some((t: { title: string }) => t.title === selectedTag)
    );
  }

  return (
    <AuthWrapper>
      <div className="flex flex-col md:flex-row h-screen bg-black/40">
        {/* Sidebar */}
        <div className="md:w-auto w-full md:h-full border-b md:border-b-0">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden ">
          <Actionbar />
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {/* Hashtag Filter */}
            {topTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 items-center">
                <span className="text-gray-400 text-sm font-medium mr-2">Top Tags:</span>
                {topTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border ${
                      selectedTag === tag
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                        : "bg-zinc-900/50 border-zinc-800 text-gray-400 hover:border-indigo-500/50 hover:text-indigo-400"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="text-xs text-gray-500 hover:text-gray-300 ml-2 underline underline-offset-2"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            )}

            <div className="flex flex-row flex-wrap gap-7">
              {loading ? (
                <p className="text-gray-400">
                  <CardsSkeleton />
                </p>
              ) : (displayContents?.length ?? 0) > 0 ? (
                displayContents.map((content) => (
                  <ContentCard
                    key={content._id}
                    title={content.title}
                    link={content.link}
                    type={content.type}
                    description={content.description}
                    postid={content._id}
                    tags={content.tags}
                    date={new Date(content.createdAt).toLocaleDateString()}
                  />
                ))
              ) : (
                search ?  <CardsSkeleton /> :
                <p className="text-gray-500">No content found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Modals & Settings */}
        <CreateModal />
        <UserModal />
        <ShareModal />
        <Settings />
      </div>
    </AuthWrapper>
  );
}
