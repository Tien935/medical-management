-- Seed specialties
INSERT INTO specialties (name, description, image_url) VALUES 
('Nội tổng quát', 'Chăm sóc sức khỏe toàn diện cho người lớn', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'),
('Nhi khoa', 'Chăm sóc sức khỏe cho trẻ em', 'https://images.unsplash.com/photo-1584825282472-b673030ca3fa?auto=format&fit=crop&w=800&q=80'),
('Tim mạch', 'Chuyên khoa về tim và mạch máu', 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80'),
('Sản phụ khoa', 'Sức khỏe phụ nữ và thai sản', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'),
('Da liễu', 'Điều trị các bệnh về da', 'https://images.unsplash.com/photo-1510832198440-a52376950479?auto=format&fit=crop&w=800&q=80'),
('Răng Hàm Mặt', 'Chăm sóc sức khỏe răng miệng', 'https://images.unsplash.com/photo-1445510861639-5651173bc5d5?auto=format&fit=crop&w=800&q=80');

-- Seed doctors
INSERT INTO doctors (name, specialty_id, degree, experience, image_url, description) VALUES 
('BS. Nguyễn Văn An', 1, 'Thạc sĩ, Bác sĩ', '15 năm kinh nghiệm', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b1a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Chuyên gia nội tổng quát với nhiều năm kinh nghiệm tại các bệnh viện lớn.'),
('ThS.BS. Trần Thị Bình', 2, 'Thạc sĩ', '10 năm kinh nghiệm', 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Yêu trẻ và tận tâm với công việc chăm sóc sức khỏe nhi nhi.'),
('BSCKII. Lê Văn Cường', 3, 'Bác sĩ chuyên khoa II', '20 năm kinh nghiệm', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Chuyên gia tim mạch hàng đầu, đã thực hiện nhiều ca phẫu thuật phức tạp.'),
('BS. Phạm Minh Đức', 4, 'Bác sĩ chuyên khoa I', '12 năm kinh nghiệm', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Chuyên khoa sản phụ khoa, đồng hành cùng mẹ bầu trong suốt thai kỳ.'),
('BS. Hoàng Thu Hà', 5, 'Bác sĩ', '8 năm kinh nghiệm', 'https://images.unsplash.com/photo-1559839734-2b71f15367ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Chuyên điều trị các bệnh lý về da và thẩm mỹ nội khoa.'),
('ThS.BS. Đỗ Kim Liên', 6, 'Thạc sĩ', '18 năm kinh nghiệm', 'https://images.unsplash.com/photo-1622902046580-2b47f47f0871?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Nhiều kinh nghiệm trong lĩnh vực phục hình răng và phẫu thuật hàm mặt.');

-- Seed users (password is 'password' hashed - for demo purposes we can use plain or typical hashed)
INSERT INTO users (username, password, full_name, email, phone, role) VALUES 
('patient1', 'password123', 'Nguyễn Văn A', 'patient1@example.com', '0123456789', 'PATIENT'),
('doctor_an', 'password123', 'BS. Nguyễn Văn An', 'an.nv@medical.com', '0987654321', 'DOCTOR');

-- Seed appointments
INSERT INTO appointments (id, patient_id, doctor_id, appointment_date, appointment_time, status) VALUES 
('PK-8241', 1, 1, '2026-05-10', '09:00:00', 'Sắp tới'),
('PK-1290', 1, 2, '2026-05-15', '14:30:00', 'Chờ xác nhận'),
('PK-0552', 1, 3, '2026-04-20', '10:00:00', 'Đã khám');
