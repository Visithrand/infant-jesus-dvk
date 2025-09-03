# Fix for Duplicate Admin Login Issue

## Problem Description
When logging in multiple times, the system was creating both a super admin and regular admin record, causing duplicate logins and requiring two separate logins.

## Root Cause
1. **Hardcoded Credentials**: The `AdminController.login()` method had hardcoded credentials that bypassed the database authentication
2. **Bootstrap Process**: The bootstrap process could create duplicate super admin entries
3. **No Duplicate Prevention**: The system didn't check for existing super admins before creating new ones

## Solution Implemented

### 1. Fixed Login Controller
- Removed hardcoded credentials from `AdminController.login()`
- Now uses proper database authentication through `AdminService.authenticateAdmin()`
- Ensures consistent authentication flow

### 2. Enhanced Bootstrap Process
- Added check for existing super admin by role
- Prevents creation of multiple super admin accounts
- Automatically cleans up duplicate super admin entries
- Updates existing super admin instead of creating new one

### 3. Added Cleanup Methods
- `cleanupDuplicateAdmins()` method in `AdminService`
- `/admin/cleanup-duplicates` endpoint in `AdminController`
- SQL cleanup script for manual database cleanup

## How to Fix Existing Duplicates

### Option 1: Use the Cleanup Endpoint (Recommended)
```bash
POST /admin/cleanup-duplicates
```
This will automatically clean up duplicate entries and ensure only one super admin exists.

### Option 2: Use the Bootstrap Endpoint
```bash
POST /admin/bootstrap-super-admin
```
This will update the existing super admin and remove duplicates.

### Option 3: Manual SQL Cleanup
Run the SQL script: `cleanup-admin-duplicates.sql`

## Current Behavior
- **Single Super Admin**: Only one super admin account exists
- **Single Login**: One login with super admin credentials is sufficient
- **No Duplicates**: System prevents creation of duplicate admin accounts
- **Consistent Authentication**: All logins go through the database

## Testing
1. **Start the backend** with the updated code
2. **Call cleanup endpoint**: `POST /admin/cleanup-duplicates`
3. **Login once** with super admin credentials: `superadmin` / `visithran@123`
4. **Verify** that only one super admin exists and login works consistently

## Files Modified
- `AdminController.java` - Fixed login method, added cleanup endpoint
- `AdminService.java` - Enhanced bootstrap, added cleanup methods
- `AdminRepository.java` - Added `findByRole` method
- `SecurityConfig.java` - Added cleanup endpoint to security config
- `cleanup-admin-duplicates.sql` - SQL cleanup script

## Benefits
- ✅ **Single Login**: Only one super admin login required
- ✅ **No Duplicates**: Prevents creation of duplicate admin accounts
- ✅ **Data Consistency**: Ensures clean database state
- ✅ **Better Security**: Proper database authentication instead of hardcoded credentials
- ✅ **Maintainable**: Clean, consistent code structure

## Future Prevention
The system now automatically prevents duplicate super admin creation during bootstrap and provides cleanup methods to maintain data integrity.
