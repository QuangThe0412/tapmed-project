import { ReviewType } from "@src/types/typeReview";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const NAME_STORAGE_CUSTOMER_COMMENT = "review-store";

interface ReviewsStore {
  reviews: ReviewType[];
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

const useReviewStore = create<ReviewsStore>()(
  persist(
    (set, get) => ({
      reviews: [],
      isLoading: false,
      error: null,

      fetchData: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await import("@dataMockup/customerComment.json");
          const data = response.default;

          set({
            reviews: data as ReviewType[],
            isLoading: false,
          });
        } catch (error) {
          console.error("Error fetching comment customers:", error);
          set({ error: "Không thể tải dữ liệu bình luận", isLoading: false });
        }
      },
    }),
    {
      name: NAME_STORAGE_CUSTOMER_COMMENT,
      partialize: (state) => ({ reviews: state.reviews }),
    }
  )
);

export default useReviewStore;
