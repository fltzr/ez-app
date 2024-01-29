import { create } from 'zustand';
import type { AuthenticatedUser } from '@/common/types/user';

type AuthState = {
  user: AuthenticatedUser | null;
  setUser: (user: AuthenticatedUser) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  setUser: user => { set({ user }); },
  clearUser: () => { set({ user: null }); },
}));
