import { create } from "zustand";
import { SearchResult } from "@/types/search";
type CreateContentModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};
export const useCreateContentModal = create<CreateContentModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

type OpenUserModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useUserModal = create<OpenUserModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

type OpenShareModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useShareModal = create<OpenShareModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

type OpenSettingsModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useOpenSettingsModal = create<OpenSettingsModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

type OpenSidebarState = {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
};
export const useOpenSidebar = create<OpenSidebarState>((set) => ({
  isOpen: false,
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
}));

type FilterState = {
  filter: string;
  setFilter: (filter: string) => void;
  refreshTrigger: number;
  triggerRefresh: () => void;
};

export const useContentFilter = create<FilterState>((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}));

type refreshVaultContentlist = {
  refetch: boolean;
  refreshTrigger: () => void;
};
export const useRefreshVault = create<refreshVaultContentlist>((set) => ({
  refetch: false,

  refreshTrigger: () => {
    set({ refetch: true });
    setTimeout(() => set({ refetch: false }), 0);
  },
}));

interface SearchResultsState {
  search: boolean;
  searchResult: SearchResult[];
  performedSearch: () => void;
  setSearchResult: (results: SearchResult[]) => void;
  clearSearch: () => void;
  resetSearch: () => void;
}

export const useSearchState = create<SearchResultsState>((set) => ({
  search: false,
  searchResult: [],

  // Mark that a search has been performed
  performedSearch: () => set({ search: true }),

  // Update search results
  setSearchResult: (results) =>
    set({
      searchResult: results,
      search: true,
    }),

  // Clear results but keep search state
  clearSearch: () => set({ searchResult: [] }),

  // Reset everything to initial state
  resetSearch: () =>
    set({
      search: false,
      searchResult: [],
    }),
}));
