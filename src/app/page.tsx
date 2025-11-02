"use client";

import { Suspense, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginPage from "./user/login/page";

function SkeletonLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 animate-pulse">
      <div className="w-64 h-8 bg-gray-300 rounded-lg" />
      <div className="w-48 h-8 bg-gray-300 rounded-lg" />
      <div className="w-72 h-8 bg-gray-300 rounded-lg" />
    </div>
  );
}

function HomeContent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      router.replace("/mind");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return null; // Suspense fallback handles loading UI
  }

  // Show login page only if user is not authenticated
  if (status === "unauthenticated") {
    return <LoginPage />;
  }

  // Return null while redirecting (authenticated state)
  return null;
}

export default function Home() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <HomeContent />
    </Suspense>
  );
}