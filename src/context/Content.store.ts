import { create } from "zustand";

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

export const useUserModal= create<OpenUserModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

type OpenShareModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useShareModal= create<OpenShareModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));