-- Insert superadmin user manually after tables are created
-- Run this script after your Spring Boot application has started and created the tables

USE `school-db`;

-- Insert superadmin user into admins table
INSERT IGNORE INTO admins (username, email, password, role, created_at, updated_at) 
VALUES (
    'superadmin', 
    'visithrand@gmail.com', 
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', -- password: visithran@123 (will be updated by bootstrap)
    'ROLE_SUPER_ADMIN', 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
);

-- Verify the insertion
SELECT * FROM admins WHERE username = 'superadmin';
