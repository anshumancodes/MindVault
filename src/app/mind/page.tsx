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

type Content = {
  _id: string;
  title: string;
  link:string;
  type: string;
  description?: string;
  tags?: { _id: string; title: string }[];
  createdAt: string;
  postid: string;
};

export default function Mind() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const { filter, refreshTrigger } = useContentFilter();
  // checking ki user exists or not! if not basically i will redirect them to login

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
        console.log(data);
        setContents(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Unexpected fetch error:", error);
        setContents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [refreshTrigger]);

  const filteredContents =
    filter === "all"
      ? contents
      : contents.filter((c) => c.type?.toLowerCase() === filter.toLowerCase());

  return (
    <SessionProvider>
      <div className="flex flex-col md:flex-row h-screen bg-black/40">
        {/* Sidebar */}
        <div className="md:w-auto w-full md:h-full border-b md:border-b-0">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden ">
          <Actionbar />
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="flex flex-row flex-wrap gap-7">
              {loading ? (
                <p className="text-gray-400">
                  <CardsSkeleton />
                </p>
              ) : (filteredContents?.length ?? 0) > 0 ? (
                filteredContents.map((content) => (
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
    </SessionProvider>
  );
}
