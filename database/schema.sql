-- Create specialties table
CREATE TABLE specialties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description TEXT,
    image_url TEXT
);

-- Create doctors table
CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    specialty_id INT,
    degree NVARCHAR(100),
    experience NVARCHAR(100),
    image_url TEXT,
    description TEXT,
    FOREIGN KEY (specialty_id) REFERENCES specialties(id)
);

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username NVARCHAR(50) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    full_name NVARCHAR(100),
    email NVARCHAR(100) UNIQUE,
    phone NVARCHAR(20),
    avatar_url TEXT,
    role NVARCHAR(20) DEFAULT 'PATIENT'
);

-- Create appointments table
CREATE TABLE appointments (
    id NVARCHAR(20) PRIMARY KEY, -- Format PK-XXXX
    patient_id INT,
    doctor_id INT,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status NVARCHAR(50) DEFAULT 'Sắp tới',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);
