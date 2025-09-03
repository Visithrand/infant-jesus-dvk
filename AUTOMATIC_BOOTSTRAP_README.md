# Automatic Bootstrap System

## 🚀 **Overview**
The application now automatically creates a super admin user when it starts up, eliminating the need for manual bootstrap calls.

## ✨ **How It Works**

### **1. Automatic Bootstrap at Startup**
- **Component**: `BootstrapConfig` implements `CommandLineRunner`
- **Trigger**: Runs automatically when Spring Boot application starts
- **Logic**: Checks if super admin exists, creates one if not, updates credentials if they've changed

### **2. Environment Variable Configuration**
```properties
# application.properties
admin.username=${ADMIN_USERNAME:superadmin}
admin.password=${ADMIN_PASSWORD:visithran@123}
admin.email=${ADMIN_EMAIL:visithrand@gmail.com}
```

### **3. Environment Variable Override**
```bash
# Set custom credentials
export ADMIN_USERNAME="myadmin"
export ADMIN_PASSWORD="MySecureP@ss123"
export ADMIN_EMAIL="admin@myschool.com"

# Windows PowerShell
$env:ADMIN_USERNAME="myadmin"
$env:ADMIN_PASSWORD="MySecureP@ss123"
$env:ADMIN_EMAIL="admin@myschool.com"
```

## 🔧 **Benefits**

1. **✅ No Manual Setup**: Super admin is automatically created
2. **✅ Environment Agnostic**: Works in development, staging, and production
3. **✅ Secure**: No public bootstrap endpoints
4. **✅ Idempotent**: Safe to restart multiple times
5. **✅ Configurable**: Easy to change credentials via environment variables

## 🚫 **What Was Removed**

- `POST /admin/bootstrap-super-admin` endpoint
- `POST /admin/cleanup-duplicates` endpoint
- Manual bootstrap process
- Public access to bootstrap endpoints

## 📋 **Usage**

### **1. Start the Application**
```bash
cd infant-jesus-dvk/backend
mvn spring-boot:run
```

### **2. Check Logs for Bootstrap**
You'll see logs like:
```
🚀 Starting application bootstrap...
👤 Creating default super admin user...
✅ Default super admin created successfully!
   Username: superadmin
   Email: visithrand@gmail.com
   Role: ROLE_SUPER_ADMIN
   ID: 1
🎉 Application bootstrap completed
```

### **3. Login Immediately**
```bash
# Login with the automatically created credentials
curl -X POST "http://localhost:8080/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"superadmin","password":"visithran@123"}'
```

## 🔐 **Default Credentials**

- **Username**: `superadmin`
- **Password**: `visithran@123`
- **Email**: `visithrand@gmail.com`
- **Role**: `ROLE_SUPER_ADMIN`

## 🌍 **Production Deployment**

### **Fly.io**
```bash
fly secrets set ADMIN_USERNAME=your_admin_username
fly secrets set ADMIN_PASSWORD=your_secure_password
fly secrets set ADMIN_EMAIL=your_admin_email
```

### **Docker**
```bash
docker run -e ADMIN_USERNAME=your_admin_username \
           -e ADMIN_PASSWORD=your_secure_password \
           -e ADMIN_EMAIL=your_admin_email \
           your-app-image
```

### **Kubernetes**
```yaml
env:
- name: ADMIN_USERNAME
  value: "your_admin_username"
- name: ADMIN_PASSWORD
  value: "your_secure_password"
- name: ADMIN_EMAIL
  value: "your_admin_email"
```

## 🧪 **Testing**

### **1. Test Public Endpoint**
```bash
curl "http://localhost:8080/admin/test"
```

### **2. Test Login**
```bash
curl -X POST "http://localhost:8080/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"superadmin","password":"visithran@123"}'
```

### **3. Test Protected Endpoint**
```bash
# Get token from login response
TOKEN="your_jwt_token_here"

# Use token
curl -H "Authorization: Bearer $TOKEN" \
     "http://localhost:8080/admin/validate"
```

## 🔍 **Troubleshooting**

### **Issue 1: Bootstrap Fails**
- Check database connection
- Verify database tables exist
- Check application logs for specific errors

### **Issue 2: Login Fails After Bootstrap**
- Verify the credentials in environment variables
- Check if the database was updated correctly
- Restart the application to trigger bootstrap again

### **Issue 3: Multiple Super Admins**
- The system automatically prevents this
- If it happens, check database constraints
- Use the cleanup methods in AdminService if needed

## 📝 **Logs to Watch For**

```
✅ Default super admin created successfully!
✅ Super admin already exists, skipping bootstrap
🔄 Super admin credentials updated to match environment variables
📊 Total admin users in database: 1
🎉 Application bootstrap completed
```

## 🎯 **Next Steps**

1. **Deploy the updated backend**
2. **Set environment variables in production**
3. **Restart the application**
4. **Login with the automatically created credentials**
5. **Start using the admin features!**

The system is now completely self-contained and requires no manual intervention! 🎉
