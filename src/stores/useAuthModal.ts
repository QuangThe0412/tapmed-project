import { create } from "zustand";

interface AuthModalState {
  isRegisterModalOpen: boolean;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const useAuthModalStore = create<AuthModalState>((set) => ({
  isRegisterModalOpen: false,
  openRegisterModal: () => set({ isRegisterModalOpen: true }),
  closeRegisterModal: () => set({ isRegisterModalOpen: false }),
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}));

export default useAuthModalStore;
