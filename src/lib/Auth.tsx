"use client"
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CardsSkeleton from "@/components/content/ContentCardSkeleton";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/user/login");
    }
  }, [status, router]);

  // While checking the session, show a loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
      <CardsSkeleton/>
      </div>
    );
  }

  // Render protected content only when authenticated
  return status === "authenticated" ? <>{children}</> : null;
};

export default AuthWrapper;
