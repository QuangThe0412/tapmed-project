import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getUserFromStorage, isAuthenticated } from "./authUntils";

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
  setUser: (user: User | null) => void;
  isLoading: boolean;
  error: string | null;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: isAuthenticated() ? getUserFromStorage() : null,
      setUser: (user) => {
        set({ user });
      },
      isLoading: false,
      error: null,
    }),
    {
      name: NAME_STORAGE_AUTH,
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
