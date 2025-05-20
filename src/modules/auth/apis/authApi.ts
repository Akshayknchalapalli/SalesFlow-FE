import axios from 'axios';
import { 
  LoginRequest, 
  AuthResponse, 
  ForgotPasswordRequest, 
  ResetPasswordRequest,
  RegisterRequest,
  ChangePasswordRequest,
  TwoFactorAuthRequest,
  User
} from '../model/AuthModels';

// API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.salesflow.com';

// Create axios instance with base config
const api = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle 401 errors (expired token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't already tried to refresh the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
        
        if (refreshToken) {
          // Try to refresh the token
          const response = await api.post<Partial<AuthResponse>>('/refresh-token', { refreshToken });
          
          // Update token in storage
          if (localStorage.getItem('refreshToken')) {
            localStorage.setItem('accessToken', response.data.accessToken!);
          } else {
            sessionStorage.setItem('accessToken', response.data.accessToken!);
          }
          
          // Update authorization header
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
          
          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, clear auth and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        
        // Redirect to login page
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API service
const authApi = {
  // Login user
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/login', data);
      
      // Store tokens in localStorage if rememberMe is true
      if (data.rememberMe) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      } else {
        // Use sessionStorage if not remembering
        sessionStorage.setItem('accessToken', response.data.accessToken);
        sessionStorage.setItem('refreshToken', response.data.refreshToken);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Register new user
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/register', data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
      
      if (refreshToken) {
        await api.post('/logout', { refreshToken });
      }
      
      // Clear storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear tokens even if API call fails
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      
      throw error;
    }
  },

  // Request password reset
  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    try {
      await api.post('/forgot-password', data);
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  // Reset password with token
  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    try {
      await api.post('/reset-password', data);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  // Change password (for authenticated users)
  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    try {
      await api.post('/change-password', data);
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },

  // Refresh access token
  refreshToken: async (refreshToken: string): Promise<Partial<AuthResponse>> => {
    try {
      const response = await api.post<Partial<AuthResponse>>('/refresh-token', { refreshToken });
      
      // Update stored token
      if (localStorage.getItem('refreshToken')) {
        localStorage.setItem('accessToken', response.data.accessToken!);
      } else {
        sessionStorage.setItem('accessToken', response.data.accessToken!);
      }
      
      return response.data;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },

  // Verify email with token
  verifyEmail: async (token: string): Promise<void> => {
    try {
      await api.post('/verify-email', { token });
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  },

  // Verify two-factor authentication code
  verifyTwoFactor: async (data: TwoFactorAuthRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/verify-2fa', data);
      return response.data;
    } catch (error) {
      console.error('Two-factor verification error:', error);
      throw error;
    }
  },

  // Get current user profile
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  // Check if user is authenticated (for front-end use)
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    return !!token;
  }
};

export default authApi;