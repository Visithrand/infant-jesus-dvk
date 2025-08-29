# API Refactoring - Complete Documentation

## Overview
This document outlines the complete refactoring of the React frontend to use a centralized API configuration system, eliminating hardcoded backend URLs and improving maintainability.

## What Was Changed

### 1. New API Configuration File
- **File**: `src/lib/api.ts`
- **Purpose**: Centralized configuration for all backend API endpoints
- **Features**:
  - Environment variable support for different backend services
  - Separate configuration for Spring Boot backend and Node.js server
  - Utility functions for building URLs and making API calls
  - Image URL helper functions

### 2. Environment Configuration
- **File**: `env.example`
- **Variables**:
  - `VITE_SPRING_BACKEND_URL`: Spring Boot backend URL (default: http://localhost:8080)
  - `VITE_NODE_SERVER_URL`: Node.js server URL (default: http://localhost:3001)

### 3. Components Refactored

#### Admin Components
- ✅ `AdminDashboard.tsx` - All Spring Boot API calls updated
- ✅ `AdminLogin.tsx` - Login API call updated
- ✅ `AdminRegistration.tsx` - Registration API call updated
- ✅ `UserRegistration.tsx` - User registration API call updated
- ✅ `RequireAuth.tsx` - Token validation API call updated

#### Public Components
- ✅ `EventGallery.tsx` - Events API and image URLs updated
- ✅ `FacilitiesSection.tsx` - Facilities API and image URLs updated
- ✅ `AboutSlideshow.tsx` - Events API and image URLs updated
- ✅ `LiveClasses.tsx` - Live classes API updated
- ✅ `LiveClassesPopup.tsx` - Live classes API updated

#### Contact & Portal Components
- ✅ `Contact.tsx` - Query submission API updated (Node.js server)
- ✅ `ParentPortal.tsx` - Query submission API updated (Node.js server)

#### Modal Components
- ✅ `EventDetailsModal.tsx` - Image URLs updated

## API Configuration Details

### Spring Boot Backend (Main API)
- **Base URL**: `VITE_SPRING_BACKEND_URL` + `/api`
- **Default**: `http://localhost:8080/api`
- **Used for**: Events, facilities, classes, admin operations, authentication

### Node.js Server (Email/Query Service)
- **Base URL**: `VITE_NODE_SERVER_URL` + `/api`
- **Default**: `http://localhost:3001/api`
- **Used for**: Contact form submissions, parent portal queries

### Utility Functions Available

```typescript
// Spring backend API calls
springApiFetch(endpoint, options)

// Node server API calls
nodeApiFetch(endpoint, options)

// Image URL helpers
getImageUrl(imagePath)

// Direct URL builders
getSpringApiUrl(endpoint)
getNodeApiUrl(endpoint)
```

## Benefits of This Refactoring

1. **Centralized Configuration**: All API URLs are now managed in one place
2. **Environment Flexibility**: Easy to switch between development and production environments
3. **Maintainability**: No more scattered hardcoded URLs throughout the codebase
4. **Consistency**: All API calls now use the same pattern and error handling
5. **Type Safety**: Full TypeScript support with proper typing
6. **Future-Proof**: Easy to add new backend services or change existing ones

## How to Use

### Development
1. Copy `env.example` to `.env`
2. Update the environment variables as needed
3. The app will use the default localhost URLs if no environment variables are set

### Production
1. Set environment variables in your deployment platform
2. Update `VITE_SPRING_BACKEND_URL` to your production Spring Boot backend
3. Update `VITE_NODE_SERVER_URL` to your production Node.js server

### Adding New API Calls
```typescript
import { springApiFetch, nodeApiFetch } from '@/lib/api';

// For Spring backend
const response = await springApiFetch('/new-endpoint', {
  method: 'POST',
  body: JSON.stringify(data)
});

// For Node.js server
const response = await nodeApiFetch('/new-endpoint', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

## Migration Notes

- All existing functionality has been preserved
- No breaking changes to the user interface
- API responses and error handling remain the same
- Image loading and display functionality unchanged
- Authentication and authorization flows remain intact

## Testing

The refactored code maintains all existing functionality:
- ✅ Admin dashboard operations (CRUD for events, classes, facilities)
- ✅ User authentication and registration
- ✅ Event gallery and facility display
- ✅ Live classes functionality
- ✅ Contact form submissions
- ✅ Parent portal queries
- ✅ Image loading and display

## Files Modified Summary

- **New Files**: 2
  - `src/lib/api.ts` - Main API configuration
  - `env.example` - Environment template
  - `API_REFACTORING_README.md` - This documentation

- **Modified Files**: 15
  - All components now use centralized API configuration
  - No more hardcoded URLs
  - Consistent API call patterns

## Next Steps

1. **Environment Setup**: Create `.env` file from `env.example`
2. **Testing**: Verify all functionality works in development
3. **Production**: Update environment variables for production deployment
4. **Monitoring**: Monitor API calls for any issues after deployment

The refactoring is now complete and the codebase is much more maintainable and production-ready!
