-- Seed specialties
SELECT * FROM users;
SELECT * FROM doctors;

ALTER TABLE doctors AUTO_INCREMENT = 1;
ALTER TABLE doctors MODIFY COLUMN description TEXT;



DELETE FROM appointments;
DELETE FROM specialties;
DELETE FROM doctors;

INSERT INTO specialties (id, name, description, image_url) VALUES 
(1, 'Nội tổng quát', 'Chăm sóc sức khỏe toàn diện cho người lớn', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'),
(2, 'Nhi khoa', 'Chăm sóc sức khỏe cho trẻ em', '	https://bacsinhi.vn/wp-content/uploads/2022/05/logo-1.jpg'),
(3, 'Tim mạch', 'Chuyên khoa về tim và mạch máu', 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80'),
(4, 'Sản phụ khoa', 'Sức khỏe phụ nữ và thai sản', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'),
(5, 'Da liễu', 'Điều trị các bệnh về da', 'https://images.unsplash.com/photo-1510832198440-a52376950479?auto=format&fit=crop&w=800&q=80'),
(6, 'Răng Hàm Mặt', 'Chăm sóc sức khỏe răng miệng', 'https://images.unsplash.com/photo-1445510861639-5651173bc5d5?auto=format&fit=crop&w=800&q=80'),
(7, 'Tai mũi họng', 'Điều trị các bệnh lý về tai, mũi, họng', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'),
(8, 'Cơ xương khớp', 'Chuyên khoa về cơ, xương, và khớp', 'https://images.unsplash.com/photo-1559508551-44bff1de756b?auto=format&fit=crop&w=800&q=80');

-- Seed doctors
INSERT INTO doctors (id, name, specialty_id, degree, experience, image_url, description, user_id) VALUES 
(1, 'BS. Nguyễn Văn An', 1, 'Thạc sĩ, Bác sĩ', '15 năm kinh nghiệm', '	https://hthaostudio.com/wp-content/uploads/2022/03/Anh-bac-si-nam-7-min.jpg.webp', 'Với hơn 15 năm kinh nghiệm trong lĩnh vực Nội khoa, Bác sĩ An không chỉ nổi tiếng bởi chuyên môn vững vàng mà còn bởi sự tận tâm, luôn lắng nghe và thấu hiểu từng nỗi lo của bệnh nhân. Ông từng công tác tại các bệnh viện tuyến đầu và sở hữu nhiều công trình nghiên cứu về điều trị bệnh lý mãn tính.', 2),
(2, 'ThS.BS. Trần Thị Bình', 2, 'Thạc sĩ', '10 năm kinh nghiệm', 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80', 'Thạc sĩ, Bác sĩ Trần Thị Bình là chuyên gia hàng đầu trong lĩnh vực Nhi khoa. Với tình yêu thương trẻ nhỏ và sự kiên nhẫn tuyệt vời, bác sĩ luôn mang đến cảm giác an tâm cho cả bé và phụ huynh. Phương châm của bác sĩ là "Chăm sóc trẻ bằng cả trái tim", ưu tiên các phương pháp điều trị hạn chế kháng sinh.', NULL),
(3, 'BSCKII. Lê Văn Cường', 3, 'Bác sĩ chuyên khoa II', '20 năm kinh nghiệm', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80', 'Bác sĩ Lê Văn Cường là đôi tay vàng trong lĩnh vực Tim mạch với hàng ngàn ca can thiệp thành công. Ông có khả năng chẩn đoán chính xác các bệnh lý phức tạp và luôn cập nhật những công nghệ điều trị tiên tiến nhất thế giới. Sự điềm tĩnh và quyết đoán của ông là chỗ dựa tinh thần vững chắc cho mọi bệnh nhân.', NULL),
(4, 'BS. Phạm Minh Đức', 4, 'Bác sĩ chuyên khoa I', '12 năm kinh nghiệm', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80', 'Đồng hành cùng hàng ngàn mẹ bầu trong hành trình vượt cạn, Bác sĩ Phạm Minh Đức được yêu mến bởi sự nhẹ nhàng và kiến thức chuyên sâu về sản phụ khoa. Bác sĩ luôn chú trọng việc tư vấn tâm lý và dinh dưỡng, giúp các mẹ có một thai kỳ khỏe mạnh và hạnh phúc nhất.', NULL),
(5, 'BS. Hoàng Thu Hà', 5, 'Bác sĩ', '8 năm kinh nghiệm', 'https://hthaostudio.com/wp-content/uploads/2022/08/Anh-profile-bac-si-min.jpg.webp', 'Bác sĩ Hoàng Thu Hà là chuyên gia trong việc điều trị các bệnh lý da liễu và thẩm mỹ nội khoa. Với con mắt thẩm mỹ tinh tế, bác sĩ giúp bệnh nhân không chỉ khỏi bệnh mà còn lấy lại sự tự tin với làn da khỏe đẹp. Cô thường xuyên tham gia các hội thảo quốc tế để cập nhật xu hướng làm đẹp an toàn.', NULL),
(6, 'ThS.BS. Đỗ Kim Liên', 6, 'Thạc sĩ', '18 năm kinh nghiệm', 'https://hthaostudio.com/wp-content/uploads/2022/08/Anh-profile-bac-si-min.jpg.webp', 'Thạc sĩ Đỗ Kim Liên chuyên sâu về phục hình răng sứ và phẫu thuật hàm mặt. Với sự tỉ mỉ trong từng thao tác, bác sĩ luôn cam kết mang lại nụ cười rạng rỡ và chức năng ăn nhai hoàn hảo nhất cho bệnh nhân. Sự hài lòng của khách hàng là thước đo thành công lớn nhất của cô.', NULL),
(7, 'BS. Phan Thị Ngọc', 7, 'Bác sĩ chuyên khoa I', '10 năm kinh nghiệm', 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=80', 'Với kinh nghiệm phong phú trong việc điều trị các bệnh lý phức tạp về Tai Mũi Họng, Bác sĩ Ngọc luôn được bệnh nhân tin tưởng nhờ phương pháp chẩn đoán chính xác và sự nhẹ nhàng trong thăm khám. Cô đặc biệt có thế mạnh trong các thủ thuật nội soi hiện đại, giúp giảm thiểu đau đớn cho người bệnh.', NULL),
(8, 'BSCKII. Trần Văn Nam', 8, 'Bác sĩ chuyên khoa II', '22 năm kinh nghiệm', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80', 'Bác sĩ Trần Văn Nam là chuyên gia đầu ngành về Cơ Xương Khớp với hơn 22 năm cống hiến cho y học. Ông chuyên điều trị các bệnh lý thoái hóa và chấn thương thể thao bằng các phương pháp bảo tồn tiên tiến. Sự tận tâm và quy trình khám chữa bệnh bài bản của ông đã giúp hàng ngàn bệnh nhân tìm lại sự linh hoạt.', NULL);

-- Seed users (password is 'password' hashed - for demo purposes we can use plain or typical hashed)
INSERT INTO users (id, username, password, full_name, email, phone, role) VALUES 
(1, 'patient1', 'password123', 'Nguyễn Văn A', 'patient1@example.com', '0123456789', 'PATIENT'),
(2, 'doctor_an', 'password123', 'BS. Nguyễn Văn An', 'an.nv@medical.com', '0987654321', 'DOCTOR');

-- Seed appointments
INSERT INTO appointments (id, patient_id, doctor_id, appointment_date, appointment_time, status) VALUES 
('PK-8241', 1, 1, '2026-05-10', '09:00:00', 'Sắp tới'),
('PK-1290', 1, 2, '2026-05-15', '14:30:00', 'Chờ xác nhận'),
('PK-0552', 1, 3, '2026-04-20', '10:00:00', 'Đã khám');
