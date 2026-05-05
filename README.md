# 🏥 Website Quản Lý Khám Bệnh (Quarkus)

## 📌 Giới thiệu

Dự án **Website Quản lý khám bệnh** là hệ thống hỗ trợ số hóa quy trình khám chữa bệnh tại phòng khám/bệnh viện.
Hệ thống cho phép quản lý bệnh nhân, bác sĩ, lịch khám, hồ sơ bệnh án và hỗ trợ đặt lịch trực tuyến.

Mục tiêu là xây dựng một nền tảng **đơn giản – hiệu quả – dễ mở rộng**, giúp giảm tải công việc thủ công và nâng cao chất lượng dịch vụ y tế.

---

## 🚀 Công nghệ sử dụng

### Backend
* Java
* Quarkus (REST API)
* Hibernate ORM

### Frontend

* HTML, Tailwind--CSS, JavaScript
* (Có thể mở rộng: React / Vue)

### Database
* MySQL

### Security
* JWT (JSON Web Token)

### Build Tool
* Maven

### Công cụ khác
* Git (version control)
* Postman (test API)

---

## ⚙️ Chức năng chính

### 👤 Người dùng (Patient)

* Đăng ký / đăng nhập
* Xem và cập nhật thông tin cá nhân
* Đặt lịch khám bệnh
* Xem lịch sử khám

### 👨‍⚕️ Bác sĩ (Doctor)

* Xem danh sách bệnh nhân
* Nhập kết quả khám
* Kê đơn thuốc

### 🛠️ Admin

* Quản lý bệnh nhân
* Quản lý bác sĩ và khoa
* Quản lý lịch khám
* Xem thống kê hệ thống

---

## 🗂️ Cấu trúc project

```
medical-system/
│
├── backend/        # Quarkus (Java)
├── frontend/       # HTML + CSS + JS
├── database/       # SQL script
├── docs/           # tài liệu (ERD, UML)
└── README.md
---
# Backend
---
backend/
│── src/
│   ├── main/
│   │   ├── java/com/medical/
│   │   │   ├── controller/      # REST API
│   │   │   ├── service/         # business logic
│   │   │   ├── repository/      # DB access
│   │   │   ├── entity/          # bảng DB
│   │   │   ├── dto/             # data transfer object
│   │   │   ├── security/        # JWT
│   │   │   └── config/          # config
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │
│── pom.xml
# Fontend
---
frontend/
│── pages/
│   ├── index.html        # trang chủ (file bạn đang có)
│   ├── login.html
│   ├── appointment.html
│
│── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── api.js        # gọi API
│   │   ├── auth.js
│   │   └── main.js
│   ├── images/
│
│── components/
│   ├── header.html
│   ├── footer.html

## 🔌 API cơ bản

### Authentication

* `POST /auth/register`
* `POST /auth/login`

### Patient

* `GET /patients`
* `POST /patients`
* `PUT /patients/{id}`
* `DELETE /patients/{id}`

### Appointment

* `POST /appointments`
* `GET /appointments`

### Medical Record

* `POST /records`
* `GET /records/{patientId}`

---

## 🛠️ Cài đặt và chạy project

### 1. Clone project

```bash
git clone https://github.com/your-username/medical-management.git
cd medical-management
```

### 2. Cấu hình database

Chỉnh file `application.properties`:

```properties
quarkus.datasource.jdbc.url=jdbc:mysql://localhost:3306/medical_db
quarkus.datasource.username=root
quarkus.datasource.password=your_password
```

### 3. Chạy project

```bash
./mvnw quarkus:dev
```

👉 Truy cập:

```
http://localhost:8080
```

---

## 🔐 Xác thực JWT

* Sau khi login, hệ thống trả về token
* Gửi token trong header:

```http
Authorization: Bearer <your_token>
```

---

## 📊 Kế hoạch phát triển (Sprint)

### Sprint 1 (MVP)

* Đăng ký / đăng nhập
* CRUD bệnh nhân
* Đặt lịch khám

### Sprint 2

* Hồ sơ bệnh án
* Kê đơn thuốc
* Lịch sử khám

### Sprint 3

* Dashboard thống kê
* Tối ưu hệ thống
* Hoàn thiện UI

---

## 👥 Thành viên nhóm
Tân - Tiền - Tú

---

## 📄 License

Dự án phục vụ mục đích học tập và nghiên cứu.

---

## 📬 Liên hệ

Nếu có thắc mắc hoặc đóng góp, vui lòng liên hệ qua email hoặc GitHub.

---
