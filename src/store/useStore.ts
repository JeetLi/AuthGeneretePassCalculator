import { create } from "zustand";

interface StoreState {
  name: string;
  setName: (name: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  name: "",
  setName: (name) => set({ name }),
}));
