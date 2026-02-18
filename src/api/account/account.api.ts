import axiosInstance from "@/axios/axios-instance";

export const getAccountApi = async () => {
  const response = await axiosInstance.get("/account");
  return response.data;
};
