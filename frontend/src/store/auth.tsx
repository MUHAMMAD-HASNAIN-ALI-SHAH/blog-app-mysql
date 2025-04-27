import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import useBlogStore from "./blog";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthenticatedLoading: boolean;
  authLoader: boolean;
  signup: (formData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<number>;
  signin: (formData: { email: string; password: string }) => Promise<number>;
  verify: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthenticatedLoading: false,
  authLoader: false,

  signup: async (formData) => {
    try {
      useBlogStore.getState().clearState();
      set({ authLoader: true });
      const response = await axiosInstance.post("/v1/auth/register", formData);
      set({ user: response.data.user, isAuthenticated: true });
      toast.success(response.data.msg, { duration: 3000 });
      set({ authLoader: false });
      return 1;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Signup failed", {
        duration: 3000,
      });
      set({ authLoader: false });
      return 0;
    }
  },

  signin: async (formData) => {
    try {
      useBlogStore.getState().clearState();
      set({ authLoader: true });
      const response = await axiosInstance.post("/v1/auth/login", formData);
      set({ user: response.data.user, isAuthenticated: true });
      toast.success(response.data.msg, { duration: 3000 });
      set({ authLoader: false });
      return 1;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Login failed", {
        duration: 3000,
      });
      set({ authLoader: false });
      return 0;
    }
  },

  verify: async () => {
    try {
      useBlogStore.getState().clearState();
      set({ isAuthenticatedLoading: true });
      const response = await axiosInstance.get("/v1/auth/verify");
      set({ user: response.data.user, isAuthenticated: true });
      set({ isAuthenticatedLoading: false });
    } catch (error: any) {
      set({ user: null, isAuthenticated: false });
      set({ isAuthenticatedLoading: false });
    }
  },

  logout: async () => {
    try {
      useBlogStore.getState().clearState();
      await axiosInstance.get("/v1/auth/logout");
      toast.success("Logged out successfully", { duration: 3000 });
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Logout failed", {
        duration: 3000,
      });
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
