// types/auth/auth.type.ts
export interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  // Add other registration fields as needed
}

export interface AuthResponse {
  message: string;
  data?: {
    token: string;
    user: User;
  };
}

export interface AuthStoreType {
  loading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  setRegister: (data: RegisterData) => Promise<boolean>;
  setLogin: (data: LoginData) => Promise<boolean>;
  setLogout: () => Promise<boolean>;
}
