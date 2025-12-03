"use client";

import { useSession } from "next-auth/react";

export function useContentSearch() {
  const { data: session } = useSession();

  async function search(query: string) {
    const userId = session?.user?.id;
    if (!userId) return [];

    const res = await fetch(`/api/search?query=${query}&userId=${userId}`);
    return res.json();
  }

  return { search };
}
