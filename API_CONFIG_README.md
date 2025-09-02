# API Configuration Guide

## Global Backend URL Configuration

The backend URL is now configured globally through Vite configuration, making it easy to switch between development and production environments.

### Configuration Files

#### 1. Vite Config (`vite.config.ts`)
```typescript
define: {
  // Global constants for API configuration
  __BACKEND_URL__: JSON.stringify(process.env.VITE_API_URL || 'http://localhost:8080'),
  __NODE_SERVER_URL__: JSON.stringify(process.env.VITE_SERVER_URL || 'http://localhost:3001'),
}
```

#### 2. API Configuration (`src/config/api.ts`)
```typescript
export const API_CONFIG = {
  // Base URLs - using global constants from Vite config
  BASE_URL: (globalThis as any).__BACKEND_URL__ || 'http://localhost:8080',
  NODE_SERVER_URL: (globalThis as any).__NODE_SERVER_URL__ || 'http://localhost:3001',
  // ... endpoints
};
```

### Environment Variables

Create a `.env` file in your frontend root directory:

```env
# Development (default)
VITE_API_URL=http://localhost:8080
VITE_SERVER_URL=http://localhost:3001

# Production (example)
# VITE_API_URL=https://your-backend-domain.com
# VITE_SERVER_URL=https://your-node-server.com
```

### Usage in Components

All components now use the centralized API service:

```typescript
import { get, post, put, deleteMethod, getImageUrl, ENDPOINTS } from '@/config/api';

// Fetch events
const events = await get(ENDPOINTS.EVENTS);

// Create event
await post(ENDPOINTS.EVENTS_ADMIN, eventData, headers);

// Get image URL
const imageUrl = getImageUrl(event.imageUrl);
```

### Benefits

1. **Centralized Configuration**: All API calls use the same base URL
2. **Environment Switching**: Easy to switch between dev/prod by changing `.env`
3. **Type Safety**: Full TypeScript support with endpoint constants
4. **Consistent Error Handling**: Unified error handling across all API calls
5. **Easy Maintenance**: Update endpoints in one place

### Deployment

For production deployment, set the environment variables:

```bash
# Render, Vercel, etc.
VITE_API_URL=https://your-backend-domain.com
VITE_SERVER_URL=https://your-node-server.com
```

The application will automatically use the production URLs when these environment variables are set.
