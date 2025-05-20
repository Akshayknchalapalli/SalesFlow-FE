import { store } from "../../../store/store";
import {
  getStoredTokens,
  decodeAccessToken,
  isTokenExpired,
  clearTokens,
  getStoredTenantId,
} from "./authUtils";
import { setCredentials, logout, setTenantId } from "../model/slices/authSlice";
import { UserRole } from "../model/AuthModels";

/**
 * Initialize authentication state when the application loads
 * This checks for existing tokens in storage and hydrates the Redux store if valid tokens exist
 */
export const initializeAuth = (): void => {
  try {
    // Get stored tokens
    const tokens = getStoredTokens();

    // If no tokens found, don't initialize auth state
    if (!tokens || !tokens.accessToken || !tokens.refreshToken) {
      return;
    }

    // Check if access token is valid and not expired
    if (isTokenExpired(tokens.accessToken)) {
      // Token is expired, clear auth state and storage
      clearTokens();
      store.dispatch(logout());
      return;
    }

    // Decode the token to get user information
    const decodedToken = decodeAccessToken(tokens.accessToken);

    if (!decodedToken) {
      // Invalid token, clear auth state and storage
      clearTokens();
      store.dispatch(logout());
      return;
    }

    // Set the authentication state in Redux
    store.dispatch(
      setCredentials({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: 3600, // Default expiry time in seconds (1 hour)
        user: {
          id: decodedToken.sub,
          email: decodedToken.email,
          role: decodedToken.role as UserRole,
          firstName: "",
          lastName: "",
          permissions: decodedToken.permissions || [],
          tenantId: decodedToken.tenantId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }),
    );

    // Check for stored tenant ID
    const storedTenantId = getStoredTenantId();
    if (storedTenantId) {
      store.dispatch(setTenantId(storedTenantId));
    }
  } catch (error) {
    console.error("Failed to initialize auth state:", error);
    // In case of any error, clear auth state to be safe
    clearTokens();
    store.dispatch(logout());
  }
};

/**
 * Call this function before rendering the app to ensure auth state is initialized
 */
export const initAuth = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    // Initialize auth state
    initializeAuth();

    // Resolve immediately - this pattern allows for any async operations in the future
    resolve();
  });
};

export default initAuth;
