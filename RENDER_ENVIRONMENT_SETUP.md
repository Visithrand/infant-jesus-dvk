# Render Environment Variables Setup Guide

## ✅ Backend Service Environment Variables

Add these environment variables in your Render dashboard under the **Environment** tab for your backend service.

### Required Environment Variables

| Key | Value | Description |
|-----|-------|-------------|
| `PORT` | `8080` | Server port |
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://dpg-d40uurqli9vc73c03t0g-a.oregon-postgres.render.com:5432/app_db_unkc` | PostgreSQL connection URL |
| `SPRING_DATASOURCE_USERNAME` | `admin` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | `rcWOBN1Vc32VQVGfaYMSbTWG99phjU8x` | Database password |
| `JWT_SECRET` | Generate using: `openssl rand -base64 64` | JWT signing key (generate a strong random string) |
| `ADMIN_USERNAME` | `superadmin` | Initial super admin username |
| `ADMIN_PASSWORD` | **CHANGE THIS** (use a strong password) | Initial super admin password |
| `ADMIN_EMAIL` | `visithrand@gmail.com` | Super admin email |

### Optional Email Configuration (if email features are needed)

| Key | Value | Description |
|-----|-------|-------------|
| `MAIL_HOST` | `smtp.gmail.com` | SMTP server host |
| `MAIL_PORT` | `587` | SMTP server port |
| `MAIL_USERNAME` | Your Gmail address | Gmail username |
| `MAIL_PASSWORD` | Your Gmail app password | Gmail app-specific password |
| `MAIL_TO` | `infantjesusdvk@gmail.com` | Default recipient |
| `MAIL_DEBUG` | `false` | Enable email debug logs |

---

## 🎯 Database Connection Details

### External PostgreSQL Database (Render Managed)
- **Host**: `dpg-d40uurqli9vc73c03t0g-a.oregon-postgres.render.com`
- **Port**: `5432`
- **Database**: `app_db_unkc`
- **Username**: `admin`
- **Password**: `rcWOBN1Vc32VQVGfaYMSbTWG99phjU8x`
- **Driver**: `org.postgresql.Driver`
- **Dialect**: `PostgreSQLDialect`

### Connection String Format
```
jdbc:postgresql://dpg-d40uurqli9vc73c03t0g-a.oregon-postgres.render.com:5432/app_db_unkc
```

---

## 🚀 Deployment Steps

1. **In Render Dashboard:**
   - Go to your backend service
   - Navigate to **Environment** tab
   - Add all the environment variables listed above
   - Click **Save Changes**

2. **Deploy:**
   - The service will automatically redeploy after saving
   - Monitor logs for successful database connection

3. **Verify Connection:**
   - Check logs for: `HikariPool-1 - Starting...` followed by `HikariPool-1 - Start completed`
   - Test with: `https://your-backend-url.onrender.com/api/test/database`
   - Login with admin credentials

---

## 🔒 Security Notes

1. **Change Default Credentials:**
   - **DO NOT** use `visithran@123` as `ADMIN_PASSWORD` in production
   - Generate a strong password (min 16 characters, mixed case, numbers, symbols)

2. **JWT Secret:**
   - Use a strong random string (minimum 64 characters)
   - Can generate with: `openssl rand -base64 64`

3. **Gmail App Password:**
   - If using Gmail SMTP, create an app-specific password
   - Don't use your regular Gmail password

---

## 🧪 Testing the Connection

### Test Endpoints

1. **Database Connection Test:**
   ```
   GET https://your-backend-url.onrender.com/api/test/database
   ```

2. **Database Tables Test:**
   ```
   GET https://your-backend-url.onrender.com/api/test/database/tables
   ```

3. **Admin Login:**
   ```
   POST https://your-backend-url.onrender.com/api/auth/login
   Content-Type: application/json
   
   {
     "username": "superadmin",
     "password": "your-admin-password"
   }
   ```

---

## ⚠️ Troubleshooting

### Database Connection Issues

1. **Check Render Logs:**
   - Look for PostgreSQL connection errors
   - Verify SSL connection is working

2. **Common Issues:**
   - **"password authentication failed"**: Check `SPRING_DATASOURCE_PASSWORD`
   - **"connection refused"**: Verify database is running and accessible
   - **"SSL error"**: PostgreSQL requires SSL, but default config should handle this

3. **Connection Pool Issues:**
   - Default pool size: 20
   - Connection timeout: 30 seconds
   - Check HikariCP logs in Render dashboard

### Application Not Starting

1. Verify all environment variables are set
2. Check that `PORT` matches the service configuration
3. Review startup logs for missing configuration

---

## 📝 Configuration Files

### Already Configured
- ✅ `backend/src/main/resources/application.properties` - Updated with external PostgreSQL
- ✅ `backend/render.yaml` - Environment variables configured

### Files Updated
- `application.properties`: Changed to external PostgreSQL connection
- `render.yaml`: Updated environment variables for PostgreSQL

---

## ✅ Success Indicators

When everything is working correctly, you should see in the logs:

```
INFO  --- HikariPool-1 - Starting...
INFO  --- HikariPool-1 - Start completed
INFO  --- Started SchoolWebsiteApplication
```

And successful API responses from the test endpoints.

---

## 📞 Support

For deployment issues, check:
1. Render deployment logs
2. Application logs in Render dashboard
3. Database connection logs
4. Network/SSL certificate issues

