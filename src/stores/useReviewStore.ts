import { ReviewType } from "@src/types/typeReview";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const NAME_STORAGE_CUSTOMER_COMMENT = "customer-comment-store";

interface CustomerCommentStore {
  commentCustomers: ReviewType[];
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

const useReviewStore = create<CustomerCommentStore>()(
  persist(
    (set, get) => ({
      commentCustomers: [],
      isLoading: false,
      error: null,

      fetchData: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await import("@dataMockup/customerComment.json");
          const data = response.default;

          set({
            commentCustomers: data as ReviewType[],
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
      partialize: (state) => ({ commentCustomers: state.commentCustomers }),
    }
  )
);

export default useReviewStore;
