import { create } from "zustand";
import axiosInstance from "../utils/axios";

interface blog {
  id: number | null;
  title: string;
  description: string;
  image: string;
}

interface blogData {
  id: number | null;
  title: string;
  description: string;
  image: string;
  likes: {
    blogID: number;
    userID: number;
  }[];
  comments: {
    id: number;
    username: string;
    comment: string;
    blogID: number;
    userID: number;
  }[];
}

interface BlogStore {
  blogs: blog[];
  blog: blogData | null;
  getBlogs: () => void;
  getBlogData: (id: number | null) => void;
  clearStateBlogData: () => void;
}

const useHomeBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  blog: null,
  getBlogs: async () => {
    try {
      const response = await axiosInstance.get("/v2/blog/blog");
      set({ blogs: response.data.blogs });
    } catch (error) {}
  },
  getBlogData: async (id) => {
    try {
      const response = await axiosInstance.get(`/v2/blog/blog/${id}`);
      set({ blog: response.data.blogData });
    } catch (error) {
      return null;
    }
  },
  clearStateBlogData: () => set({ blog: null }),
}));

export default useHomeBlogStore;
