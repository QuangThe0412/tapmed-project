import { ProductItemType } from "@src/types/typeProduct";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateSlug } from "@src/utils/common";

export const NAME_STORAGE_PRODUCT = "product-store";

interface ProductStore {
  products: ProductItemType[];
  setProducts: (products: ProductItemType[]) => void;
  isLoading: boolean;
  error: string | null;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      isLoading: false,
      error: null,
      setProducts: (products) => set({ products }),
    }),
    {
      name: NAME_STORAGE_PRODUCT,
      partialize: (state) => ({ products: state.products }),
    }
  )
);
