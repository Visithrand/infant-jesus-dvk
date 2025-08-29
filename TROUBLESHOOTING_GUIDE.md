# 🚨 Troubleshooting Guide - Admin Dashboard Issues

## 🔍 **Current Issues Identified & Fixed:**

### 1. **Content-Type Header Conflict** ✅ FIXED
- **Problem**: API functions were always setting `Content-Type: application/json`, blocking image uploads
- **Solution**: Modified `springApiFetch` to detect FormData and avoid setting Content-Type header
- **File**: `src/lib/api.ts`

### 2. **Missing fetchAllData Function** ✅ FIXED
- **Problem**: Component referenced `fetchAllData()` but function wasn't defined
- **Solution**: Added complete `fetchAllData()` function with proper error handling
- **File**: `src/components/AdminDashboard.tsx`

### 3. **Poor Error Handling** ✅ FIXED
- **Problem**: Generic error messages without specific details
- **Solution**: Added detailed error parsing from API responses
- **File**: `src/components/AdminDashboard.tsx`

### 4. **Missing Data Fetching** ✅ FIXED
- **Problem**: Data wasn't loaded when component mounted
- **Solution**: Added `useEffect` hooks to fetch data on mount and token change
- **File**: `src/components/AdminDashboard.tsx`

### 5. **Image Upload Validation** ✅ FIXED
- **Problem**: No file validation for size and type
- **Solution**: Added file size (5MB max) and type validation (JPG, PNG, GIF)
- **File**: `src/components/AdminDashboard.tsx`

## 🧪 **Testing Steps:**

### Step 1: Verify API Configuration
1. Go to `/api-test` route
2. Click "🔍 Debug API Config"
3. Check browser console for configuration details
4. Verify URLs point to `https://infant-jesus-dvk-2.onrender.com`

### Step 2: Test API Connection
1. Click "🧪 Test Spring API"
2. Click "🧪 Test Node API"
3. Verify both return success responses

### Step 3: Test Image Upload
1. Click "🖼️ Test Image Upload"
2. Verify FormData is sent successfully

## 🔧 **Debug Tools Added:**

### Admin Dashboard Debug Section
- **🔄 Refresh All Data**: Manually refresh all data from backend
- **📊 Debug State**: Log current component state to console

### Enhanced Error Messages
- Specific error messages from backend
- File validation feedback
- Network error details

### File Information Display
- File name, size, and type for uploaded images
- Real-time validation feedback

## 🚀 **Performance Improvements:**

### Optimistic UI Updates
- Immediate UI feedback for create/delete operations
- Automatic rollback on failure
- Reduced perceived loading time

### Smart Data Fetching
- Data loaded only when needed
- No redundant API calls
- Efficient state management

## 📋 **Common Issues & Solutions:**

### Issue: "Failed to create event/facility/class"
**Solutions:**
1. Check browser console for detailed error messages
2. Verify backend is running at `https://infant-jesus-dvk-2.onrender.com`
3. Check authentication token is valid
4. Verify image file size < 5MB and type is JPG/PNG/GIF

### Issue: "Network error"
**Solutions:**
1. Check internet connection
2. Verify backend URL is accessible
3. Check CORS configuration on backend
4. Try refreshing the page

### Issue: Images not uploading
**Solutions:**
1. Verify file type is JPG, PNG, or GIF
2. Check file size is under 5MB
3. Ensure backend supports multipart/form-data
4. Check browser console for upload errors

## 🔍 **Backend Requirements:**

### Spring Boot Backend
- **Health Endpoint**: `/api/health` (for testing)
- **Events**: `/api/events/admin` (POST, GET, DELETE)
- **Classes**: `/api/classes/admin` (POST, GET, DELETE)
- **Facilities**: `/api/facilities/admin` (POST, GET, DELETE)
- **Image Upload**: Support for `multipart/form-data`

### Node.js Server
- **Health Endpoint**: `/api/health` (for testing)
- **Email/Query**: `/api/send-query` (POST)

## 📱 **User Experience Improvements:**

### Form Validation
- Required field validation
- File type and size validation
- Future date validation for class schedules

### Loading States
- Disabled buttons during operations
- Loading text indicators
- Optimistic UI updates

### Notifications
- Success messages for all operations
- Detailed error messages
- Auto-dismissing notifications

## 🎯 **Next Steps:**

1. **Test the fixes** using the debug tools
2. **Verify backend endpoints** are working correctly
3. **Check image upload** functionality
4. **Monitor console** for any remaining errors
5. **Test all CRUD operations** for events, classes, and facilities

## 📞 **If Issues Persist:**

1. Check browser console for error messages
2. Use the debug tools in Admin Dashboard
3. Test API endpoints using `/api-test` route
4. Verify backend logs for server-side errors
5. Check network tab for failed requests

---

**Last Updated**: Current session
**Status**: ✅ All critical issues fixed
**Next**: Test the fixes and verify functionality
