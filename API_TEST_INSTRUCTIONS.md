# 🔧 API Configuration Test Instructions

## 🚨 **Problem Identified:**
Your frontend is still fetching from localhost instead of your deployed backend at `https://infant-jesus-dvk-2.onrender.com`

## 🧪 **How to Test and Fix:**

### **Step 1: Test Current Configuration**
1. **Open your frontend application**
2. **Navigate to**: `/api-test` (e.g., `http://localhost:5173/api-test`)
3. **Open browser DevTools** (F12) → Console tab
4. **Click "🔍 Debug API Config"** button
5. **Check the console output** - it will show exactly what URLs are being used

### **Step 2: Check What You Should See**
In the console, you should see:
```
🔧 API Configuration Debug: {
  SPRING_BACKEND: "https://infant-jesus-dvk-2.onrender.com",
  NODE_SERVER: "https://infant-jesus-dvk-2.onrender.com",
  SPRING_FULL_URL: "https://infant-jesus-dvk-2.onrender.com/api",
  NODE_FULL_URL: "https://infant-jesus-dvk-2.onrender.com/api"
}
```

### **Step 3: If You Still See Localhost**
This means the environment variables aren't being loaded. You need to:

1. **Create a `.env` file** in your project root:
```bash
# .env file content
VITE_SPRING_BACKEND_URL=https://infant-jesus-dvk-2.onrender.com
VITE_NODE_SERVER_URL=https://infant-jesus-dvk-2.onrender.com
```

2. **Restart your development server**:
```bash
npm run dev
# or
yarn dev
```

### **Step 4: Test API Calls**
1. **Click "🧪 Test Spring API"** button
2. **Check console** - should see:
```
🌐 Spring API Call: {
  endpoint: "/events",
  fullUrl: "https://infant-jesus-dvk-2.onrender.com/api/events",
  baseUrl: "https://infant-jesus-dvk-2.onrender.com",
  apiPath: "/api"
}
```

## 🔍 **What to Look For:**

### **✅ Correct Configuration:**
- URLs show `https://infant-jesus-dvk-2.onrender.com`
- API calls go to the deployed backend
- No more localhost URLs

### **❌ Wrong Configuration:**
- URLs still show `http://localhost:8080`
- API calls go to local server
- Environment variables not loaded

## 🚀 **After Fixing:**

1. **Remove the test component** (optional)
2. **Test your admin dashboard** - create events/facilities/classes
3. **Check Network tab** - all API calls should go to `https://infant-jesus-dvk-2.onrender.com`
4. **Verify data is saved** to your deployed backend

## 📝 **Quick Fix Summary:**

The issue is likely that you need to create a `.env` file with:
```bash
VITE_SPRING_BACKEND_URL=https://infant-jesus-dvk-2.onrender.com
VITE_NODE_SERVER_URL=https://infant-jesus-dvk-2.onrender.com
```

Then restart your dev server! 🎯
