import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  clearStorage,
  getUserFromStorage,
  getUserId,
  isAuthenticated,
} from "./authUntils";

export const NAME_STORAGE_AUTH = "auth";

export type User = {
  id: number;
  username: string;
  fullName?: string;
  phone: string;
  email: string;
  address: string;
  avatar?: string;
  roles: string[];
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuthenticated: (user: User | null) => void;
  isLoading: boolean;
  error: string | null;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: isAuthenticated() ? getUserFromStorage() : null,
      isAuthenticated: isAuthenticated(),
      setAuthenticated: (user) => {
        set({ user, isAuthenticated: !!user });
      },
      isLoading: false,
      error: null,
      logout: () => {
        set({ user: null, isAuthenticated: false });
        clearStorage();
      },
    }),
    {
      name: NAME_STORAGE_AUTH,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
