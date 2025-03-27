import { create } from "zustand";
import useOrderStore from "./useOrderStore";

interface CartState {
  isCartOpen: boolean;
  productCount: number;
  openCart: () => void;
  closeCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  isCartOpen: false,
  productCount: useOrderStore.getState()?.orders?.orderItems?.length,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));

// Subscribe to order changes and update productCount accordingly
useOrderStore.subscribe((state) => {
  const productCount = state.orders?.orderItems?.length;
  useCartStore.setState({ productCount });
});

export default useCartStore;
