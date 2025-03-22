import { getProducts } from "@src/page/product/productEndPoint";
import { ProductItemType } from "@src/types/typeProduct";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const NAME_STORAGE_PRODUCT = "product-store";

interface ProductStore {
  products: ProductItemType[];
  setProducts: (products: ProductItemType[]) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
  totalElements: number;
  setTotalElements: (totalElements: number) => void;
  error: string | null;
  fetchProducts: (page: number, size: number) => Promise<void>;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      isLoading: false,
      setLoading: (isLoading) => set({ isLoading }),
      totalPages: 0,
      setTotalPages: (totalPages) => set({ totalPages }),
      totalElements: 0,
      setTotalElements: (totalElements) => set({ totalElements }),
      error: null,
      setProducts: (products) => set({ products }),
      fetchProducts: async (page, size) => {
        set({ isLoading: true });
        try {
          const res = await getProducts(page, size);
          if (!res) {
            throw new Error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
          }
          set({
            products: res.products,
            totalPages: res.totalPages,
            totalElements: res.totalElements,
          });
        } catch (error: any) {
          console.error("Lỗi khi tải dữ liệu:", error);
          set({
            error:
              error?.message || "Không thể tải dữ liệu. Vui lòng thử lại sau.",
          });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: NAME_STORAGE_PRODUCT,
      partialize: (state) => ({ products: state.products }),
    }
  )
);
