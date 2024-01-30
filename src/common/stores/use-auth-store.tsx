import { create } from 'zustand';
import type { AuthenticatedUser } from '@/types/user';

type AuthState = {
  isAuthenticated: boolean;
  user: AuthenticatedUser | null;

  setUser: (user: AuthenticatedUser) => void;
  clearUser: () => void;
  setAuthState: (state: Partial<AuthState>) => void;
};

export const useAuthStore = create<AuthState>(set => ({
  // Initial state
  isAuthenticated: false,
  user: null,

  // Actions
  setUser: user => {
    set({ user });
  },
  clearUser: () => {
    set({ user: null });
  },
  setAuthState: newState => {
    set(state => ({ ...state, ...newState }));
  },
}));
