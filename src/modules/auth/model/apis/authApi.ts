import axios from 'axios';

// Access env variable safely with fallback
const API_BASE_URL = (import.meta.env?.VITE_API_BASE_URL as string) || 'http://localhost:8000/api';

// Create axios instance with default config
const authApiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Interface for login request
export interface LoginRequest {
  username: string;
  password: string;
  tenantId?: string;
}

// Interface for login with OTP request
export interface LoginWithOTPRequest {
  username: string;
  otp: string;
  tenantId?: string;
}

// Interface for sending OTP request
export interface SendOTPRequest {
  username: string;
  tenantId?: string;
}

// Interface for forgot password request
export interface ForgotPasswordRequest {
  email: string;
  tenantId?: string;
}

// Interface for reset password request
export interface ResetPasswordRequest {
  token: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

// Interface for auth response
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    permissions: string[];
    tenantId: string;
  };
}

// Authentication API service
export const authApi = {
  // Login with username and password
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await authApiInstance.post('/auth/login', data);
    return response.data;
  },

  // Request OTP for login
  requestOTP: async (data: SendOTPRequest): Promise<{ message: string }> => {
    const response = await authApiInstance.post('/auth/request-otp', data);
    return response.data;
  },

  // Login with OTP
  loginWithOTP: async (data: LoginWithOTPRequest): Promise<AuthResponse> => {
    const response = await authApiInstance.post('/auth/login-with-otp', data);
    return response.data;
  },

  // Forgot password - sends reset link to email
  forgotPassword: async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
    const response = await authApiInstance.post('/auth/forgot-password', data);
    return response.data;
  },

  // Reset password with token
  resetPassword: async (data: ResetPasswordRequest): Promise<{ message: string }> => {
    const response = await authApiInstance.post('/auth/reset-password', data);
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
    const response = await authApiInstance.post('/auth/refresh-token', { refreshToken });
    return response.data;
  },

  // Logout
  logout: async (): Promise<{ message: string }> => {
    const response = await authApiInstance.post('/auth/logout');
    return response.data;
  },
};

export default authApi;