import axiosInstance from "../../axios/axios-instance";
import type {
  BasicMessageResponse,
  ChangePasswordDto,
  ForgotPasswordDto,
  VerifyResetCodeDto,
  VerifyResetCodeResponse,
} from "../../types/account/password-reset.type";

/**
 * Step 1: Send reset code
 */
export const forgotPasswordApi = async (
  data: ForgotPasswordDto,
): Promise<BasicMessageResponse> => {
  const response = await axiosInstance.post<BasicMessageResponse>(
    "/auth/forgot-password",
    data,
  );

  return response.data;
};

/**
 * Step 2: Verify code
 */
export const verifyResetCodeApi = async (
  data: VerifyResetCodeDto,
): Promise<VerifyResetCodeResponse> => {
  const response = await axiosInstance.post<VerifyResetCodeResponse>(
    "/auth/verify-code",
    data,
  );

  return response.data;
};

/**
 * Step 3: Change password
 */
export const changePasswordApi = async (
  data: ChangePasswordDto,
): Promise<BasicMessageResponse> => {
  const response = await axiosInstance.post<BasicMessageResponse>(
    "/auth/change-password",
    data,
  );

  return response.data;
};
