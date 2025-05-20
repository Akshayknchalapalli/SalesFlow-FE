import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createEnhancedGenericSlice } from "../../../../store/enhancedGenericSlice";
import authApi from "../../apis/authApi";
import { AuthResponse, User } from "../../model/AuthModels";

// Define the authentication state
export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    username?: string;
    email: string;
    role: string;
    permissions: string[];
    tenantId?: string;
  } | null;
  accessToken: string | null;
  refreshToken: string | null;
  tenantId: string | null;
}

// Define the initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  tenantId: null,
};

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.isAuthenticated = true;
      state.user = {
        id: user.id,
        username: user.username || "",
        email: user.email,
        role: user.role.toString(),
        permissions: user.permissions || [],
        tenantId: user.tenantId || ""
      };
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.tenantId = user.tenantId || null;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setTenantId: (state, action: PayloadAction<string>) => {
      state.tenantId = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      // Optionally preserve the tenantId for next login
    },
    clearAuth: (state) => {
      // Complete reset
      return initialState;
    },
  },
});

// Create login thunk
const { thunk: loginThunk, reducer: _loginReducer } = createEnhancedGenericSlice(
  {
    name: "auth/login",
    thunkOptions: {
      transformResponse: (response: AuthResponse) => response,
    },
  },
  authApi.login
);

// Create verify email thunk
const { thunk: verifyEmailThunk, reducer: _verifyEmailReducer } = createEnhancedGenericSlice(
  {
    name: "auth/verifyEmail",
  },
  authApi.verifyEmail
);

// Create get current user thunk
const { thunk: getCurrentUserThunk, reducer: _getCurrentUserReducer } = createEnhancedGenericSlice(
  {
    name: "auth/getCurrentUser",
  },
  authApi.getCurrentUser
);

// Create forgot password thunk
const { thunk: forgotPasswordThunk, reducer: _forgotPasswordReducer } = createEnhancedGenericSlice(
  {
    name: "auth/forgotPassword",
  },
  authApi.forgotPassword
);

// Create reset password thunk
const { thunk: resetPasswordThunk, reducer: _resetPasswordReducer } = createEnhancedGenericSlice(
  {
    name: "auth/resetPassword",
  },
  authApi.resetPassword
);

// Create refresh token thunk
const { thunk: refreshTokenThunk, reducer: _refreshTokenReducer } = createEnhancedGenericSlice(
  {
    name: "auth/refreshToken",
    thunkOptions: {
      transformResponse: (response: { accessToken: string; refreshToken: string }) => response,
    },
  },
  (refreshToken: string) => authApi.refreshToken(refreshToken)
);

// Create logout thunk
const { thunk: logoutThunk, reducer: _logoutReducer } = createEnhancedGenericSlice(
  {
    name: "auth/logoutAPI",
  },
  authApi.logout
);

// Export actions and thunks
export const { setCredentials, updateAccessToken, setTenantId, logout, clearAuth } = authSlice.actions;

export {
  loginThunk,
  verifyEmailThunk,
  getCurrentUserThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  refreshTokenThunk,
  logoutThunk,
};

// Export auth state selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;
export const selectRefreshToken = (state: { auth: AuthState }) => state.auth.refreshToken;
export const selectTenantId = (state: { auth: AuthState }) => state.auth.tenantId;
export const selectUserRole = (state: { auth: AuthState }) => state.auth.user?.role;
export const selectUserPermissions = (state: { auth: AuthState }) => state.auth.user?.permissions || [];

export default authSlice.reducer;