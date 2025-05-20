import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";

const TOKEN_STORAGE_KEY = "auth_tokens";
const TENANT_STORAGE_KEY = "tenant_id";

// Secret key for encrypting tokens in local storage
// In production, this should be stored securely
const ENCRYPTION_KEY = (import.meta.env?.VITE_TOKEN_ENCRYPTION_KEY as string) || "default-secure-key";

// Interface for decoded JWT Token
export interface DecodedToken {
  sub: string; // subject (user id)
  email: string;
  role: string;
  permissions: string[];
  tenantId: string;
  exp: number; // expiration timestamp
  iat: number; // issued at timestamp
}

// Interface for stored tokens
export interface StoredTokens {
  accessToken: string;
  refreshToken: string;
}

// Encrypt data for storage
export const encryptData = (data: any): string => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    ENCRYPTION_KEY
  ).toString();
};

// Decrypt data from storage
export const decryptData = (encryptedData: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Error decrypting data:", error);
    return null;
  }
};

// Store tokens securely
export const storeTokens = (tokens: StoredTokens): void => {
  try {
    const encryptedTokens = encryptData(tokens);
    localStorage.setItem(TOKEN_STORAGE_KEY, encryptedTokens);
  } catch (error) {
    console.error("Error storing tokens:", error);
  }
};

// Retrieve tokens from storage
export const getStoredTokens = (): StoredTokens | null => {
  try {
    const encryptedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!encryptedTokens) return null;
    
    return decryptData(encryptedTokens);
  } catch (error) {
    console.error("Error retrieving tokens:", error);
    return null;
  }
};

// Clear tokens from storage
export const clearTokens = (): void => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

// Store tenant ID
export const storeTenantId = (tenantId: string): void => {
  localStorage.setItem(TENANT_STORAGE_KEY, tenantId);
};

// Get stored tenant ID
export const getStoredTenantId = (): string | null => {
  return localStorage.getItem(TENANT_STORAGE_KEY);
};

// Decode access token
export const decodeAccessToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeAccessToken(token);
    if (!decoded) return true;
    
    // Check if the token will expire in the next 60 seconds
    // This gives us a buffer to refresh the token before actual expiration
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime + 60;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

// Check if user has required role
export const hasRole = (requiredRole: string, userRoles: string | string[]): boolean => {
  if (!userRoles) return false;
  
  const roles = Array.isArray(userRoles) ? userRoles : [userRoles];
  return roles.includes(requiredRole);
};

// Check if user has required permission
export const hasPermission = (requiredPermission: string, userPermissions: string[]): boolean => {
  if (!userPermissions || userPermissions.length === 0) return false;
  return userPermissions.includes(requiredPermission);
};

// Check if any of the required permissions are present
export const hasAnyPermission = (requiredPermissions: string[], userPermissions: string[]): boolean => {
  if (!userPermissions || userPermissions.length === 0) return false;
  return requiredPermissions.some(permission => userPermissions.includes(permission));
};

// Check if all required permissions are present
export const hasAllPermissions = (requiredPermissions: string[], userPermissions: string[]): boolean => {
  if (!userPermissions || userPermissions.length === 0) return false;
  return requiredPermissions.every(permission => userPermissions.includes(permission));
};