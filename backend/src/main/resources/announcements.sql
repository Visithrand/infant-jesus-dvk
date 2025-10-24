-- Create announcements table (PostgreSQL)
CREATE TABLE IF NOT EXISTS announcements (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    priority VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample announcements
INSERT INTO announcements (title, message, priority, is_active) VALUES
('Welcome to the New Academic Year', 'We are excited to welcome all students and parents to the new academic year. Classes will begin on Monday, June 3rd, 2024.', 'HIGH', true),
('Parent-Teacher Meeting', 'The monthly parent-teacher meeting will be held on Saturday, June 15th, 2024, from 10:00 AM to 12:00 PM. All parents are requested to attend.', 'NORMAL', true),
('Annual Sports Day', 'Our annual sports day will be celebrated on Friday, July 5th, 2024. Students are encouraged to participate in various sports events.', 'NORMAL', true),
('Library Week Celebration', 'Library week will be celebrated from June 10th to June 16th, 2024. Various activities including book reading, storytelling, and book exhibitions will be organized.', 'LOW', true),
('Emergency School Closure', 'Due to inclement weather, the school will remain closed tomorrow. All classes and activities are cancelled.', 'URGENT', true);

-- Create index on priority and created_at for better performance
CREATE INDEX idx_announcements_priority ON announcements(priority);
CREATE INDEX idx_announcements_created_at ON announcements(created_at);
CREATE INDEX idx_announcements_active ON announcements(is_active);
