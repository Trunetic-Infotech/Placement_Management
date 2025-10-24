create database Placement_ManagementDB;
use Placement_ManagementDB;

CREATE TABLE admin (
  admin_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15),
  role ENUM('Admin') DEFAULT 'Admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reports_generated INT DEFAULT 0
);


CREATE TABLE student (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phoneNumber VARCHAR(15) NOT NULL,
  password VARCHAR(255) NOT NULL,
  roll_no VARCHAR(50) UNIQUE,
  department VARCHAR(100),
  course VARCHAR(100),
  cgpa DECIMAL(3,2),
  skills TEXT,
  resume_url VARCHAR(255),
  photo_url VARCHAR(255),
  certificate_url VARCHAR(255),
  applied_jobs TEXT,
  status ENUM('select', 'reject', 'pending') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_rollno (roll_no),
  INDEX idx_department (department)
);


CREATE TABLE recruiter (
  recruiter_id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  company_email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  hr_name VARCHAR(255),
  hr_photo VARCHAR(500),
  job_posting TEXT,
  company_logo VARCHAR(500),
  industry_type VARCHAR(255),
  website_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexing for performance
CREATE INDEX idx_company_email ON recruiter (company_email);
CREATE INDEX idx_industry_type ON recruiter (industry_type);

CREATE TABLE company_details (
  company_id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  company_email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  hr_name VARCHAR(255),
  company_logo VARCHAR(500),
  industry_type VARCHAR(255),
  website_url VARCHAR(255),
  address TEXT,
  postal_code VARCHAR(20),
  contact_number VARCHAR(20),
  about_company TEXT,
  no_of_employees INT,
  linkedin_url VARCHAR(255),
  status ENUM('active', 'inactive') DEFAULT 'active',
  
  -- ✅ NEW FIELD: who registered the company
  registered_by ENUM('owner', 'hr') NOT NULL DEFAULT 'owner',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
