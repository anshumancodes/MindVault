"use client";

import { useSession } from "next-auth/react";

export function useContentSearch() {
  const { data: session } = useSession();

  async function search(query: string) {
    const userEmail = session?.user?.email;
    if (!userEmail) return [];

    const res = await fetch(`/api/v1/search?query=${query}&user=${userEmail}`);
    return res.json();
  }

  return { search };
}
