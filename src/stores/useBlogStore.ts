import { BlogType } from "@src/types/typeBlog";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const NAME_STORAGE_BLOG = "blog-store";

interface BlogStore {
  blogPosts: BlogType[];
  setBlogPosts: (posts: BlogType[]) => void;
  isLoading: boolean;
  error: string | null;
}

const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      blogPosts: [],
      isLoading: false,
      error: null,
      setBlogPosts: (posts) => set({ blogPosts: posts }),
    }),
    {
      name: NAME_STORAGE_BLOG,
      partialize: (state) => ({
        blogPosts: state.blogPosts,
      }),
    }
  )
);

export default useBlogStore;
