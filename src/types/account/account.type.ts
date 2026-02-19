export type AccountType = {
  _id: string;
  name: string;
  email: string;
};

// What frontend sends on register
export type RegisterDto = {
  name: string;
  email: string;
  password: string;
};

// What frontend sends on login
export type LoginDto = {
  email: string;
  password: string;
};

export type ForgotPasswordDto = {
  email: string;
};

// What frontend sends when resetting password
export type ResetPasswordDto = {
  email: string;
  code: string;
  password: string;
};
