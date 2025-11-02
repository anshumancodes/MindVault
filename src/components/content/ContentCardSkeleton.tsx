"use client";

export default function CardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-[#0e0e0e] border border-neutral-800 rounded-xl p-4 shadow-sm animate-pulse w-[350px] h-[270px]"
        >
          <div className="h-5 w-3/4 bg-neutral-700 rounded mb-3"></div>

          <div className="space-y-2 mb-4">
            <div className="h-4 w-full bg-neutral-800 rounded"></div>
            <div className="h-4 w-5/6 bg-neutral-800 rounded"></div>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="h-4 w-12 bg-neutral-800 rounded"></div>
            <div className="h-4 w-8 bg-neutral-800 rounded"></div>
            <div className="h-4 w-10 bg-neutral-800 rounded"></div>
          </div>

          <div className="flex justify-between items-center">
            <div className="h-3 w-1/3 bg-neutral-800 rounded"></div>
            <div className="h-3 w-1/5 bg-neutral-800 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
