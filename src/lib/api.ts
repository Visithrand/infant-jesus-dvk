// API Configuration and Utilities
// This file centralizes all backend API configuration and provides utility functions

// Environment variables for different backend services
const API_CONFIG = {
  // Spring Boot Backend (Main API) - Deployed to Render
  // Default: https://infant-jesus-dvk-2.onrender.com
  // Override with VITE_SPRING_BACKEND_URL environment variable
  SPRING_BACKEND: import.meta.env.VITE_SPRING_BACKEND_URL || 'https://infant-jesus-dvk-2.onrender.com',

  // Node.js Server (Email/Query service) - Deployed to Render
  // Default: https://infant-jesus-dvk-2.onrender.com
  // Override with VITE_NODE_SERVER_URL environment variable
  NODE_SERVER: import.meta.env.VITE_NODE_SERVER_URL || 'https://infant-jesus-dvk-2.onrender.com',

  // API Context Paths
  SPRING_API_PATH: '/api',
  NODE_API_PATH: '/api',
} as const;

// Full API base URLs
export const API_BASE_URLS = {
  SPRING: `${API_CONFIG.SPRING_BACKEND}${API_CONFIG.SPRING_API_PATH}`,
  NODE: `${API_CONFIG.NODE_SERVER}${API_CONFIG.NODE_API_PATH}`,
} as const;

// Utility function to get full Spring backend URL
export const getSpringApiUrl = (endpoint: string): string => {
  return `${API_BASE_URLS.SPRING}${endpoint}`;
};

// Utility function to get full Node server URL
export const getNodeApiUrl = (endpoint: string): string => {
  return `${API_BASE_URLS.NODE}${endpoint}`;
};

// Utility function to get full image URL from Spring backend
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_CONFIG.SPRING_BACKEND}${imagePath}`;
};

// Enhanced fetch wrapper for Spring backend
export const springApiFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = getSpringApiUrl(endpoint);
  

  
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

// Enhanced fetch wrapper for Node server
export const nodeApiFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = getNodeApiUrl(endpoint);
  

  
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

// Generic API fetch with custom base URL
export const apiFetch = async (
  baseUrl: string,
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = `${baseUrl}${endpoint}`;
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

// Export the config for direct access if needed
export { API_CONFIG };

// Debug function to show current configuration
export const debugApiConfig = () => {
  console.log('🔧 API Configuration Debug:', {
    SPRING_BACKEND: API_CONFIG.SPRING_BACKEND,
    NODE_SERVER: API_CONFIG.NODE_SERVER,
    SPRING_API_PATH: API_CONFIG.SPRING_API_PATH,
    NODE_API_PATH: API_CONFIG.NODE_API_PATH,
    SPRING_FULL_URL: API_BASE_URLS.SPRING,
    NODE_FULL_URL: API_BASE_URLS.NODE,
    ENV_SPRING: import.meta.env.VITE_SPRING_BACKEND_URL,
    ENV_NODE: import.meta.env.VITE_NODE_SERVER_URL,
    STATUS: '🔧 Using environment variables with fallback to deployed URLs'
  });
};

// Auto-debug on import
debugApiConfig();
