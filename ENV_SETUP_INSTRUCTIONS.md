# 🔧 Environment Variables Setup

## 📝 **What You Need to Do:**

### **Step 1: Create .env File**
1. **In your project root** (same folder as `package.json`)
2. **Create a new file** named exactly `.env` (with the dot)
3. **Copy this content** into the `.env` file:

```bash
VITE_SPRING_BACKEND_URL=https://infant-jesus-dvk-2.onrender.com
VITE_NODE_SERVER_URL=https://infant-jesus-dvk-2.onrender.com
```

### **Step 2: Restart Development Server**
```bash
# Stop your current dev server (Ctrl+C)
# Then restart:
npm run dev
# or
yarn dev
```

## 🧪 **Test It:**

1. **Go to**: `/api-test`
2. **Click "🔍 Debug API Config"** button
3. **You should see**:
   ```
   🔧 API Configuration Debug: {
     SPRING_BACKEND: "https://infant-jesus-dvk-2.onrender.com",
     NODE_SERVER: "https://infant-jesus-dvk-2.onrender.com",
     ENV_SPRING: "https://infant-jesus-dvk-2.onrender.com",
     ENV_NODE: "https://infant-jesus-dvk-2.onrender.com",
     STATUS: "🔧 Using environment variables with fallback to deployed URLs"
   }
   ```

## ✅ **What This Means:**

- **Environment variables are loaded** ✅
- **Frontend uses deployed backend** ✅
- **All API calls go to** `https://infant-jesus-dvk-2.onrender.com` ✅
- **No more localhost URLs** ✅

## 🚨 **Important Notes:**

- **File must be named** `.env` (with the dot)
- **Must be in project root** (same level as `package.json`)
- **Must restart dev server** after creating the file
- **VITE_ prefix is required** for Vite to expose variables

## 🔄 **If You Still See Localhost:**

1. **Check file name** - must be `.env` not `env`
2. **Check file location** - must be in project root
3. **Restart dev server** - environment variables only load on startup
4. **Check file content** - no spaces around `=` sign

**After creating the .env file and restarting, everything will work! 🎉**
