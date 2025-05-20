import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getStoredTokens, isTokenExpired, storeTokens } from "./authUtils";
import { store } from "../../../store/store";
import { updateAccessToken, logout } from "../model/slices/authSlice";

// Define the base URL for API requests
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// Create a custom Axios instance
export const axiosAuthInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Track if the refresh token process is in progress
let isRefreshing = false;
// Store pending requests that should be retried after token refresh
let pendingRequests: Array<{
  config: InternalAxiosRequestConfig;
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}> = [];

// Function to refresh the access token using refresh token
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const tokens = getStoredTokens();
    if (!tokens?.refreshToken) {
      return null;
    }

    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh-token`,
      { refreshToken: tokens.refreshToken },
      { headers: { "Content-Type": "application/json" } },
    );

    const { accessToken, refreshToken } = response.data;

    // Store the new tokens
    storeTokens({ accessToken, refreshToken });

    // Update the Redux store with the new access token
    store.dispatch(updateAccessToken(accessToken));

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // If token refresh fails, log the user out
    store.dispatch(logout());
    return null;
  }
};

// Process all pending requests after token refresh
const processPendingRequests = (newToken: string | null): void => {
  pendingRequests.forEach(({ config, resolve, reject }) => {
    if (newToken) {
      config.headers.Authorization = `Bearer ${newToken}`;
      resolve(axiosAuthInstance(config));
    } else {
      reject(new Error("Token refresh failed"));
    }
  });

  // Clear pending requests
  pendingRequests = [];
};

// Request interceptor for adding the auth token to requests
axiosAuthInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const tokens = getStoredTokens();

    // If there's no access token, proceed without it
    if (!tokens?.accessToken) {
      return config;
    }

    // Check if token is expired
    if (isTokenExpired(tokens.accessToken)) {
      // If a refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise<InternalAxiosRequestConfig>((resolve, reject) => {
          pendingRequests.push({
            config,
            resolve,
            reject,
          });
        });
      }

      // Start the refresh process
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        isRefreshing = false;

        // Process any pending requests
        processPendingRequests(newToken);

        // Update authorization header with new token
        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
        }

        return config;
      } catch (error) {
        isRefreshing = false;
        processPendingRequests(null);
        return Promise.reject(error);
      }
    }

    // Token is valid, add it to the request
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for handling auth errors
axiosAuthInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest: InternalAxiosRequestConfig & { _retry?: boolean } =
      error.config;

    // If the error is not related to authentication or has already been retried, reject it
    if (
      !error.response ||
      error.response.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    // Mark this request as retried to prevent infinite loops
    originalRequest._retry = true;

    // If a refresh is already in progress, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({
          config: originalRequest,
          resolve,
          reject,
        });
      });
    }

    // Start the refresh process
    isRefreshing = true;

    try {
      const newToken = await refreshAccessToken();
      isRefreshing = false;

      // Process any pending requests
      processPendingRequests(newToken);

      // If token refresh was successful, retry the original request
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosAuthInstance(originalRequest);
      }

      // If token refresh failed and we have no token, reject the request
      return Promise.reject(error);
    } catch (refreshError) {
      isRefreshing = false;
      processPendingRequests(null);
      return Promise.reject(refreshError);
    }
  },
);

export default axiosAuthInstance;
