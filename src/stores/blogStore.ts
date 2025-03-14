import { BlogType } from "@src/types/typeBlog";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const NAME_STORAGE_BLOG = "blog-store";

interface BlogStore {
  blogPosts: BlogType[];
  isLoading: boolean;
  error: string | null;
  fetchBlogs: () => Promise<void>;
  getBlogs: (category: "promotion" | "news") => BlogType[];
}

const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      blogPosts: [],
      isLoading: false,
      error: null,

      fetchBlogs: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await import("@dataMockup/blogData.json");
          const data = response.default;
          set({ blogPosts: data, isLoading: false });
        } catch (error) {
          console.error("Error fetching blog posts:", error);
          set({ error: "Không thể tải dữ liệu bài viết", isLoading: false });
        }
      },

      getBlogs: (category: "promotion" | "news") => {
        const { blogPosts } = get();
        return blogPosts.filter((post) => post.category === category);
      },
    }),
    {
      name: NAME_STORAGE_BLOG,
      partialize: (state) => ({ blogPosts: state.blogPosts }),
    }
  )
);

export default useBlogStore;
