-- EduConnect Database Schema for TiDB
-- Run this in your TiDB console

USE test;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact BIGINT NOT NULL,
  image TEXT,
  email_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add some sample data (optional)
INSERT INTO schools (name, address, city, state, contact, email_id) VALUES
('Demo School', '123 Education Street', 'Mumbai', 'Maharashtra', 9876543210, 'demo@school.com'),
('Sample Academy', '456 Learning Avenue', 'Delhi', 'Delhi', 9876543211, 'info@sample.edu');