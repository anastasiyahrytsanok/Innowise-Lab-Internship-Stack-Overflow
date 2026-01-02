import { create } from "zustand";
import type { User } from "../api/users/users.types";

type AuthState = {
  user: User | null;
  isAuthChecked: boolean;

  setUser: (user: User | null) => void;
  setAuthChecked: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthChecked: false,

  setUser: (user) => set({ user }),
  setAuthChecked: () => set({ isAuthChecked: true }),
  logout: () => set({ user: null, isAuthChecked: true }),
}));
