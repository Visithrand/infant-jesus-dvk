-- Initialize MySQL database for Infant Jesus School
-- This script runs when the MySQL container starts

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `school-db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Set default character set for the session
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_connection=utf8mb4;

-- Use the database
USE `school-db`;

-- Grant all privileges to root user
GRANT ALL PRIVILEGES ON `school-db`.* TO 'root'@'%';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;
