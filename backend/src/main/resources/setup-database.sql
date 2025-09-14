-- Database setup script for Infant Jesus School
-- Run this script to set up the database properly

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `school-db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE `school-db`;

-- Create admins table
CREATE TABLE IF NOT EXISTS `admins` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(20) NOT NULL DEFAULT 'ROLE_ADMIN',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS `announcements` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `message` TEXT,
    `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
    `priority` VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create events table (if not exists)
CREATE TABLE IF NOT EXISTS `events` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `image_url` VARCHAR(500),
    `event_date_time` TIMESTAMP NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create class_schedules table (if not exists)
CREATE TABLE IF NOT EXISTS `class_schedules` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `subject` VARCHAR(255) NOT NULL,
    `teacher` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `schedule_time` TIMESTAMP NOT NULL,
    `is_live` BOOLEAN NOT NULL DEFAULT FALSE,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create facilities table (if not exists)
CREATE TABLE IF NOT EXISTS `facilities` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `image_url` VARCHAR(500),
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert super admin user
-- Note: The password will be properly hashed by Spring Security when you call the bootstrap endpoint
INSERT IGNORE INTO `admins` (username, email, password, role, created_at, updated_at) 
VALUES (
    'superadmin', 
    'visithrand@gmail.com', 
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', -- This will be updated by bootstrap
    'ROLE_SUPER_ADMIN', 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS `idx_admins_username` ON `admins`(username);
CREATE INDEX IF NOT EXISTS `idx_admins_email` ON `admins`(email);
CREATE INDEX IF NOT EXISTS `idx_admins_role` ON `admins`(role);
CREATE INDEX IF NOT EXISTS `idx_announcements_priority` ON `announcements`(priority);
CREATE INDEX IF NOT EXISTS `idx_announcements_created_at` ON `announcements`(created_at);
CREATE INDEX IF NOT EXISTS `idx_announcements_active` ON `announcements`(is_active);

-- Show the current state
SELECT 'Database setup completed successfully!' as status;
SELECT COUNT(*) as admin_count FROM admins;
SELECT username, email, role FROM admins;
