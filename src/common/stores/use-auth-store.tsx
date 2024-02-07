import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import type { Account } from "@/types/user";

type AuthStore = {
  isInitialized: boolean;
  isAuthenticated?: boolean;
  user: Account | null;

  setUser: (user: Account) => void;
  clearUser: () => void;
  setAuthState: (state: Partial<AuthStore>) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  isInitialized: false,
  isAuthenticated: undefined,
  user: null,

  // Actions
  setUser: (user) => {
    set({ user });
  },
  clearUser: () => {
    set({ user: null });
  },
  setAuthState: (newState) => {
    set((state) => ({ ...state, ...newState }));
  },
}));

if (import.meta.env.DEV) {
  mountStoreDevtool("Auth Store", useAuthStore);
}
