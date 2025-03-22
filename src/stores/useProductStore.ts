import { ProductItemType } from "@src/types/typeProduct";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const NAME_STORAGE_PRODUCT = "product-store";

interface ProductStore {
  products: ProductItemType[];
  setProducts: (products: ProductItemType[]) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  error: string | null;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      isLoading: false,
      setLoading: (isLoading) => set({ isLoading }),
      error: null,
      setProducts: (products) => set({ products }),
    }),
    {
      name: NAME_STORAGE_PRODUCT,
      partialize: (state) => ({ products: state.products }),
    }
  )
);
