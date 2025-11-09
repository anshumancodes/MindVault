"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import Actionbar from "@/components/Actionbar/Actionbar";
import ContentCard from "@/components/content/ContentCard";
import CardsSkeleton from "@/components/content/ContentCardSkeleton";

type Content = {
  _id: string;
  title: string;
  link: string;
  type: string;
  description?: string;
  tags?: { _id: string; title: string }[];
  createdAt: string;
  postid: string;
};

export default function SharedBrain() {
  const { hash } = useParams(); // e.g. "33919ade7a3c"
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState<string>("");
  useEffect(() => {
    const fetchSharedContent = async () => {
      if (!hash) {
        setError("Missing shared brain hash!");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/v1/content/shared", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sharedHash: hash }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));

          setError(errData.error || "Unable to fetch shared content.");
          setContents([]);
          return;
        }

        const data = await res.json();
        const contentArray = Array.isArray(data.Content) ? data.Content : [];
        setContents(Array.isArray(data.Content) ? data.Content : []);
        if (contentArray.length > 0 && contentArray[0].owner) {
          setOwnerName(contentArray[0].owner.name);
        }
      } catch (err) {
        setError("Something went wrong while loading shared brain content.");
        setContents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [hash]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black/40">
      {/* Sidebar */}
      <div className="md:w-auto w-full md:h-full border-b md:border-b-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Actionbar />
        <h1 className="text-2xl sm:text-3xl font-bold text-white ml-5 mt-5">
          {ownerName ? `${ownerName}'s Brain` : "Shared Brain"}
        </h1>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <CardsSkeleton />
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : contents.length > 0 ? (
            <div className="flex flex-row flex-wrap gap-7">
              {contents.map((content) => (
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
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No shared content found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
