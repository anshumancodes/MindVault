"use client";

import { useSession } from "next-auth/react";
import { useState, useCallback } from "react";

interface SearchResult {
  _id: string;
  title: string;
  type: string;
  description?: string;
  link?: string;
  score: number;
  createdAt: string;
}

interface SearchResponse {
  results: SearchResult[];
  count: number;
  query: string;
}

export function useContentSearch() {
  const { data: session, status } = useSession();
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //  to memoize the search function basically
  const search = useCallback(
    async (query: string): Promise<SearchResult[]> => {
      setError(null);

      if (status === "unauthenticated") {
        setError("You must be logged in to search");
        return [];
      }

      if (status === "loading") {
        setError("Please wait, authenticating...");
        return [];
      }

      // Validate query
      if (!query || query.trim().length === 0) {
        setError("Search query cannot be empty");
        return [];
      }

      if (query.length > 500) {
        setError("Search query is too long (max 500 characters)");
        return [];
      }

      setIsSearching(true);

      try {
        // Encode query to handle special characters
        const encodedQuery = encodeURIComponent(query.trim());

        const res = await fetch(`/api/v1/search?query=${encodedQuery}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          let errorMessage = `Search failed with status ${res.status}`;
          try {
            const errorData = await res.json();
            errorMessage = errorData.error || errorMessage;
          } catch {}
          throw new Error(errorMessage);
        }

        // Parse JSON response
        const data: SearchResponse = await res.json();

        //  results array or empty array if none or if yk empty data comes
        return data.results || [];
      } catch (err) {
        // error handling , if search fails basically
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Could not perform search. Please try again.";

        setError(errorMessage);
        console.error("Search error:", err);

        //returns empty array on error
        return [];
      } finally {
        // well i reset loading state
        setIsSearching(false);
      }
    },
    [status]
  );

  // Clears error manually if needed
  const clearError = useCallback(() => setError(null), []);

  return {
    search,
    isSearching,
    error,
    clearError,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}
