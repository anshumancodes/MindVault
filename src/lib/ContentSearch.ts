"use client";

import { useSession } from "next-auth/react";
import { useState, useCallback } from "react";
import { SearchResult } from "@/types/search";


export function useContentSearch() {
  const { status } = useSession();
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(
    async (query: string): Promise<SearchResult[]> => {
      setError(null);

      // Check authentication status
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
          } catch {
            // Ignore JSON parse errors
          }
          throw new Error(errorMessage);
        }

        // Parse response - API returns array directly
        const data: SearchResult[] = await res.json();
        
        console.log("Search results:", data);

        // Return results array
        return Array.isArray(data) ? data : [];
        
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Could not perform search. Please try again.";

        setError(errorMessage);
        console.error("Search error:", err);

        return [];
      } finally {
        setIsSearching(false);
      }
    },
    [status]
  );

  // Clear error manually
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