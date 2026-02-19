export type ForgotPasswordDto = {
  email: string;
};

export type VerifyResetCodeDto = {
  email: string;
  code: string;
};

export type ChangePasswordDto = {
  resetToken: string;
  newPassword: string;
};

export type VerifyResetCodeResponse = {
  message: string;
  resetToken: string;
};

export type BasicMessageResponse = {
  message: string;
};
