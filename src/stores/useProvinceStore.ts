import { ProvinceType } from "@src/types/typeProvice";
import { getProvince } from "@src/utils/common";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const NAME_STORAGE_Province = "Province-store";

interface ProvinceStore {
  Provinces: ProvinceType[];
  isLoading: boolean;
  error: string | null;
  fetchProvinces: () => Promise<void>;
}

export const useProvinceStore = create<ProvinceStore>()(
  persist(
    (set) => ({
      Provinces: [],
      isLoading: false,
      error: null,

      fetchProvinces: async () => {
        set({ isLoading: true, error: null });
        try {
          // await new Promise((resolve) => setTimeout(resolve, 3000));
          set({
            Provinces: await getProvince(),
            isLoading: false,
          });
        } catch (error) {
          console.error("Error fetching Provinces:", error);
          set({ error: "Không thể tải dữ liệu tỉnh/thành", isLoading: false });
        }
      },
    }),
    {
      name: NAME_STORAGE_Province,
      partialize: (state) => ({ Provinces: state.Provinces }),
    }
  )
);
