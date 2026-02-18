import type { AuthStoreType } from "@/types/auth/auth.type";
import { showError } from "@/utils/error/error.utils";
import toast from "react-hot-toast";
import { create } from "zustand";
import { loginApi, logoutApi, registerApi } from "../../api/auth/auth.api";

export const useAuthStore = create<AuthStoreType>((set) => ({
  loading: false,
  user: null, // Missing
  isAuthenticated: false, // Missing

  setRegister: async (data) => {
    set({ loading: true });
    try {
      const response = await registerApi(data);
      console.log("Response: ", response);
      toast.success(response.message);

      // If registration returns user data, update store
      if (response.user) {
        set({
          user: response.user,
          isAuthenticated: true,
        });
      }

      return true;
    } catch (error) {
      console.log(error);
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  setLogin: async (data) => {
    set({ loading: true });
    try {
      const response = await loginApi(data);
      toast.success(response.message);

      // Store user data and auth state
      if (response.user) {
        set({
          user: response.user,
          isAuthenticated: true,
        });
      }

      // Store token if needed
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      return true;
    } catch (error) {
      console.error(error);
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  setLogout: async () => {
    set({ loading: true });
    try {
      const response = await logoutApi();
      toast.success(response.message);

      // Clear user data and auth state
      set({
        user: null,
        isAuthenticated: false,
      });

      // Remove token from storage
      localStorage.removeItem("token");

      return true;
    } catch (error) {
      console.log(error);
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // Add a method to check auth status
  checkAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally validate token with backend
      set({ isAuthenticated: true });
    }
  },
}));
