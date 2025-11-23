-- ===================================
-- Connectomedia Database Setup
-- ===================================

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS connectomedia_db;

-- Use the database
USE connectomedia_db;

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Display table structure
DESCRIBE contact_messages;

-- Display message
SELECT 'Database setup completed successfully!' AS Status;
