// API Configuration and Constants
export const API_CONFIG = {
  // Base URLs - using global constants from Vite config with reliable fallbacks
  BASE_URL: (globalThis as any).__BACKEND_URL__ || (import.meta as any).env?.VITE_BACKEND_URL || "",
  NODE_SERVER_URL: (globalThis as any).__NODE_SERVER_URL__ || (import.meta as any).env?.VITE_NODE_SERVER_URL || "",
  
  // API Endpoints
  ENDPOINTS: {
    // Admin endpoints
    ADMIN_LOGIN: '/admin/login',
    ADMIN_CREATE: '/admin/create',
    ADMIN_VALIDATE: '/admin/validate',
    ADMIN_LIST: '/admin/list',
    
    // Events endpoints
    EVENTS: '/events',
    EVENTS_ADMIN: '/events/admin',
    
    // Classes endpoints
    CLASSES_LIVE: '/classes/live',
    CLASSES_ADMIN: '/classes/admin',
    
    // Facilities endpoints
    FACILITIES: '/facilities',
    FACILITIES_ADMIN: '/facilities/admin',
    
    // User endpoints
    USER_REGISTER: '/users/register',
    
    // Email endpoints
    SEND_QUERY: '/send-query',
    SEND_EMAIL: '/email/send'
  }
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
};

// Common headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

// API Utility Functions
export class ApiService {
  private static baseUrl = API_CONFIG.BASE_URL;
  private static nodeServerUrl = API_CONFIG.NODE_SERVER_URL;

  private static assertConfigured() {
    if (!this.baseUrl || typeof this.baseUrl !== 'string' || this.baseUrl.trim() === '') {
      throw new Error('Backend URL is not configured. Set VITE_BACKEND_URL and redeploy.');
    }
  }

  // Generic fetch method for Spring Boot backend
  static async fetch(endpoint: string, options: RequestInit = {}) {
    this.assertConfigured();
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: { ...DEFAULT_HEADERS, ...options.headers },
      ...options
    };

    console.log(`\ud83c\udf10 Making API request to: ${url}`);
    console.log(`\ud83d\udce4 Request config:`, config);

    try {
      const response = await fetch(url, config);
      
      console.log(`\ud83d\udce5 Response status: ${response.status}`);
      console.log(`\ud83d\udce5 Response headers:`, response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`\u274c HTTP Error ${response.status}:`, errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log(`\u2705 Response data:`, data);
      return data;
    } catch (error) {
      console.error(`\u274c API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Generic fetch method for Node.js server
  static async fetchNode(endpoint: string, options: RequestInit = {}) {
    const url = `${this.nodeServerUrl}${endpoint}`;
    const config: RequestInit = {
      headers: { ...DEFAULT_HEADERS, ...options.headers },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Node API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Specific API methods
  static async get(endpoint: string, headers?: Record<string, string>) {
    return this.fetch(endpoint, { method: HTTP_METHODS.GET, headers });
  }

  static async post(endpoint: string, data: any, headers?: Record<string, string>) {
    return this.fetch(endpoint, {
      method: HTTP_METHODS.POST,
      headers,
      body: JSON.stringify(data)
    });
  }

  static async put(endpoint: string, data: any, headers?: Record<string, string>) {
    return this.fetch(endpoint, {
      method: HTTP_METHODS.PUT,
      headers,
      body: JSON.stringify(data)
    });
  }

  static async delete(endpoint: string, headers?: Record<string, string>) {
    return this.fetch(endpoint, { method: HTTP_METHODS.DELETE, headers });
  }

  static async patch(endpoint: string, data: any, headers?: Record<string, string>) {
    return this.fetch(endpoint, {
      method: HTTP_METHODS.PATCH,
      headers,
      body: JSON.stringify(data)
    });
  }

  // Node.js server methods
  static async postToNode(endpoint: string, data: any, headers?: Record<string, string>) {
    return this.fetchNode(endpoint, {
      method: HTTP_METHODS.POST,
      headers,
      body: JSON.stringify(data)
    });
  }

  // Utility method to build image URL
  static getImageUrl(imagePath: string): string {
    this.assertConfigured();
    return `${this.baseUrl}${imagePath}`;
  }
}

// Export commonly used methods for convenience
export const {
  get,
  post,
  put,
  delete: deleteMethod,
  patch,
  postToNode,
  getImageUrl
} = ApiService;
