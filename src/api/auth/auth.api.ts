import axiosInstance from "../../axios/axios-instance";
import type { AccountType, LoginDto } from "../../types/account/account.type";

export const registerApi = async (data: Partial<AccountType>) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

type LoginResponse = {
  message: string;
  accessToken: string;
};

export const loginApi = async (data: LoginDto) => {
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    data
  );
  return response.data;
};

export const logoutApi = async () => {
  const response = await axiosInstance.post("/auth/logout"); // Send email in body
  return response.data;
};
