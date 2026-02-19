import {
  changePasswordApi,
  forgotPasswordApi,
  verifyResetCodeApi,
} from "@/api/account/password-reset.api";
import { create } from "zustand";

type PasswordResetState = {
  loading: boolean;
  error: string | null;
  resetToken: string | null;

  forgotPassword: (email: string) => Promise<void>;
  verifyCode: (email: string, code: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;

  clearError: () => void;
};

export const usePasswordResetStore = create<PasswordResetState>((set, get) => ({
  loading: false,
  error: null,
  resetToken: null,

  clearError: () => set({ error: null }),

  forgotPassword: async (email) => {
    try {
      set({ loading: true, error: null });
      await forgotPasswordApi({ email });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Something went wrong" });
    } finally {
      set({ loading: false });
    }
  },

  verifyCode: async (email, code) => {
    try {
      set({ loading: true, error: null });

      const res = await verifyResetCodeApi({ email, code });

      set({ resetToken: res.resetToken });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Invalid code" });
    } finally {
      set({ loading: false });
    }
  },

  changePassword: async (newPassword) => {
    try {
      const { resetToken } = get();

      if (!resetToken) throw new Error("No reset token found");

      set({ loading: true, error: null });

      await changePasswordApi({ resetToken, newPassword });

      set({ resetToken: null });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Password change failed" });
    } finally {
      set({ loading: false });
    }
  },
}));
