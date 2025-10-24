-- Clean up duplicate admin entries
-- This script should be run to fix any duplicate super admin issues

-- First, let's see what we have
SELECT id, username, email, role, created_at FROM admins ORDER BY role, created_at;

-- Delete duplicate super admin entries (keep the first one) - PostgreSQL
DELETE FROM admins a1
USING admins a2 
WHERE a1.id > a2.id 
AND a1.role = 'ROLE_SUPER_ADMIN' 
AND a2.role = 'ROLE_SUPER_ADMIN';

-- Delete duplicate admin entries with same email (keep the one with SUPER_ADMIN role if exists) - PostgreSQL
DELETE FROM admins a1
USING admins a2 
WHERE a1.id > a2.id 
AND a1.email = a2.email
AND a1.role != 'ROLE_SUPER_ADMIN'
AND a2.role != 'ROLE_SUPER_ADMIN';

-- Delete admin entries with same email as super admin (keep super admin) - PostgreSQL
DELETE FROM admins a1
USING admins a2 
WHERE a1.id != a2.id 
AND a1.email = a2.email
AND a1.role = 'ROLE_ADMIN'
AND a2.role = 'ROLE_SUPER_ADMIN';

-- Verify the cleanup
SELECT id, username, email, role, created_at FROM admins ORDER BY role, created_at;

-- Ensure only one super admin exists
SELECT COUNT(*) as super_admin_count FROM admins WHERE role = 'ROLE_SUPER_ADMIN';
