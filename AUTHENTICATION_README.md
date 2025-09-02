# Authentication and Authorization System

## Overview

This document describes the comprehensive authentication and authorization system implemented for the Infant Jesus School website. The system provides role-based access control with three distinct user roles: SUPER_ADMIN, ADMIN, and USER.

## User Roles

### 1. SUPER_ADMIN
- **Email**: visithrand@gmail.com
- **Password**: visithran@123
- **Capabilities**:
  - Full system access
  - Can create, manage, and delete admin accounts
  - Cannot be deleted or modified through normal operations
  - Access to all administrative functions
  - Bootstrap endpoint for initial setup

### 2. ADMIN
- **Capabilities**:
  - Content management access
  - Can manage events, classes, and facilities
  - Cannot create other admin accounts
  - Cannot access SUPER_ADMIN functions
  - Created only by SUPER_ADMIN

### 3. USER
- **Capabilities**:
  - View-only access to school information
  - Access to events, facilities, and programs
  - Cannot access admin dashboard
  - Cannot be upgraded to admin role
  - Self-registration available

## Security Features

### Password Security
- All passwords are hashed using BCrypt
- Minimum password length: 6 characters
- Password confirmation required for registration

### JWT Token Security
- Tokens include user role information
- Token expiration: 24 hours (configurable)
- Secure token validation on each request
- Role-based access control at API level

### API Protection
- Public endpoints: login, user registration, public content
- Protected endpoints: admin functions, content management
- Role-based middleware protection
- CORS configuration for security

## API Endpoints

### Public Endpoints
```
POST /api/admin/login - Admin login
POST /api/admin/bootstrap-super-admin - Bootstrap SUPER_ADMIN
POST /api/users/register - User registration
GET /api/events - Public events
GET /api/classes/live - Live classes
GET /api/facilities - Public facilities
```

### Admin-Only Endpoints
```
POST /api/admin/register - Create admin (SUPER_ADMIN only)
POST /api/admin/create - Create admin (SUPER_ADMIN only)
GET /api/admin/list - List all admins (SUPER_ADMIN only)
DELETE /api/admin/{id} - Delete admin (SUPER_ADMIN only)
GET /api/admin/validate - Validate admin token
```

### Protected Content Management
```
POST /api/events/admin - Create event
DELETE /api/events/admin/{id} - Delete event
POST /api/classes/admin - Create class
PUT /api/classes/admin/{id}/toggle-live - Toggle live status
POST /api/facilities/admin - Create facility
DELETE /api/facilities/admin/{id} - Delete facility
```

## Database Schema

### Admin Table
```sql
CREATE TABLE admin (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('SUPER_ADMIN', 'ADMIN') NOT NULL DEFAULT 'ADMIN',
    created_at DATETIME NOT NULL,
    updated_at DATETIME
);
```

### Users Table
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER') NOT NULL DEFAULT 'USER',
    created_at DATETIME NOT NULL,
    updated_at DATETIME
);
```

## Frontend Components

### Authentication Components
- `AuthenticationPage` - Main authentication portal
- `AdminLogin` - Admin login form
- `AdminRegistration` - Admin registration (SUPER_ADMIN only)
- `UserRegistration` - User registration
- `RequireAuth` - Route protection middleware

### Dashboard Components
- `AdminDashboard` - Admin management interface
- `UserPortal` - Regular user interface
- `SuperAdminNav` - SUPER_ADMIN navigation

## Setup Instructions

### 1. Bootstrap SUPER_ADMIN
```bash
# First-time setup
curl -X POST http://localhost:8080/api/admin/bootstrap-super-admin
```

### 2. Create Admin Accounts
```bash
# Login as SUPER_ADMIN first, then:
curl -X POST http://localhost:8080/api/admin/create \
  -H "Authorization: Bearer <SUPER_ADMIN_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin1","email":"admin1@school.com","password":"password123"}'
```

### 3. User Registration
```bash
# Regular users can self-register
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"user1","email":"user1@school.com","password":"password123","confirmPassword":"password123"}'
```

## Security Best Practices

### 1. Token Management
- Store tokens securely in localStorage
- Implement token refresh mechanism
- Clear tokens on logout
- Validate tokens on each request

### 2. Role Verification
- Always verify user role on backend
- Never trust frontend role claims
- Implement proper middleware protection
- Log authentication attempts

### 3. Password Security
- Enforce strong password policies
- Implement rate limiting on login attempts
- Use HTTPS in production
- Regular security audits

## Error Handling

### Common Error Responses
```json
{
  "success": false,
  "message": "Unauthorized: admin access only"
}
```

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (insufficient permissions)
- `500` - Internal Server Error

## Monitoring and Logging

### Security Events Logged
- Login attempts (success/failure)
- Role-based access attempts
- Admin account creation/deletion
- Token validation failures

### Debug Information
- User role verification
- Token extraction and validation
- Authorization decisions
- Security filter operations

## Troubleshooting

### Common Issues

1. **Token Expired**
   - Clear localStorage and re-login
   - Check JWT expiration configuration

2. **Role Access Denied**
   - Verify user role in database
   - Check token role claims
   - Ensure proper role assignment

3. **Admin Creation Failed**
   - Verify SUPER_ADMIN credentials
   - Check database permissions
   - Validate input data

4. **User Registration Issues**
   - Check email/username uniqueness
   - Verify password requirements
   - Check database connectivity

## Future Enhancements

### Planned Features
- Two-factor authentication (2FA)
- Password reset functionality
- Account lockout after failed attempts
- Session management
- Audit trail logging
- Role-based permissions granularity

### Security Improvements
- Rate limiting implementation
- IP-based access restrictions
- Advanced password policies
- Security headers implementation
- Regular security updates

## Support

For technical support or security concerns:
- Contact: visithrand@gmail.com
- Role: SUPER_ADMIN
- Priority: High for security issues

---

**Note**: This system is designed with security as a top priority. All authentication and authorization decisions are made on the backend, and frontend role claims should never be trusted for security decisions.
