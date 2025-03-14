import { ProductItemType } from "@src/types/typeProduct";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateSlug } from "@src/utils/common";

export const NAME_STORAGE_PRODUCT = "product-store";

interface ProductStore {
  products: ProductItemType[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      isLoading: false,
      error: null,

      fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
          // Nếu bạn dùng API:
          // const response = await fetch('/api/products');
          // const data = await response.json();
          // set({ products: data, isLoading: false });

          // Nếu dùng dữ liệu JSON tĩnh:
          //delay 3 giây để mô phỏng việc fetch dữ liệu từ server
          // await new Promise((resolve) => setTimeout(resolve, 3000));

          const ProductData = await import("@dataMockup/productData.json");
          const PATH_IMAGE = "https://tapmed.vn/storage/";

          set({
            products: ProductData.default.map((item) => ({
              ...item,
              images: item?.images.map((image) => PATH_IMAGE + image),
              link: `/products/${generateSlug(item.name || "")}-${
                item.id
              }.html`,
            })),
            isLoading: false,
          });
        } catch (error) {
          console.error("Error fetching products:", error);
          set({ error: "Không thể tải dữ liệu sản phẩm", isLoading: false });
        }
      },
    }),
    {
      name: NAME_STORAGE_PRODUCT,
      partialize: (state) => ({ products: state.products }),
    }
  )
);
