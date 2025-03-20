import { create } from "zustand";
import { persist } from "zustand/middleware";

export const NAME_STORAGE_AUTH = "auth";

export type User = {
  id: number;
  name: string;
  phone: string;
  drugStoreName: string;
  address: string;
  avatar?: any;
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // Mock API call - replace with actual API call
          // await new Promise(resolve => setTimeout(resolve, 1000));

          // Mock successful login response
          if (username && password) {
            const user: User = {
              id: 1,
              name: "Người Dùng",
              phone: username,
              drugStoreName: "Nhà Thuốc Mẫu",
              address: "123 Đường Mẫu, Quận 1, TP.HCM",
              avatar: "",
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            });

            // User data is set in the state, no need to return it
          }

          throw new Error("Tên đăng nhập hoặc mật khẩu không đúng");
        } catch (error) {
          if (error instanceof Error) {
            set({ error: error.message, isLoading: false });
          } else {
            set({ error: "Đăng nhập thất bại", isLoading: false });
          }
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
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
