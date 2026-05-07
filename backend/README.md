# Backend - Medical Management System

Mã nguồn Backend cho hệ thống Medical Management, được phát triển trên nền tảng Quarkus và Java 21.

## 1. Yêu cầu hệ thống

- **Java Development Kit (JDK) 21**
- **MySQL Server** đang chạy (mặc định ở cổng `3306`)
- Cài đặt Maven (tùy chọn, có thể dùng `mvnw` đi kèm dự án)

## 2. Cấu hình Database

1. Tạo database MySQL bằng lệnh sau:
   ```sql
   CREATE DATABASE medical_db;
   ```

2. Thông tin kết nối mặc định được cấu hình trong `src/main/resources/application.properties`:
   - **Tên đăng nhập:** `root`
   - **Mật khẩu:** `123456`

*Lưu ý: Bạn không cần tạo bảng thủ công. Ứng dụng sử dụng Hibernate để tự động tạo và cập nhật cấu trúc bảng khi khởi chạy.*

## 3. Hướng dẫn chạy ứng dụng

### Chạy ở chế độ Development
Chế độ này hỗ trợ tự động reload khi source code thay đổi.
Mở Command Prompt/PowerShell tại thư mục `backend` và chạy lệnh:

```cmd
mvnw.cmd quarkus:dev
```

- Quarkus Dev UI: [http://localhost:8080/q/dev/](http://localhost:8080/q/dev/)

### Chạy ở môi trường Production (Đóng gói ứng dụng)
1. Build ứng dụng:
   ```cmd
   mvnw.cmd package
   ```
2. Chạy ứng dụng từ file `.jar` đã build:
   ```cmd
   java -jar target/quarkus-app/quarkus-run.jar
   ```

## 4. Thông tin kết nối API

- **Base URL:** `http://localhost:8080/api`
- Ứng dụng đã được cấu hình sẵn CORS cho phép các domain Frontend gọi trực tiếp API.

## 5. Cấu trúc thư mục

```text
backend/
 ├── src/main/java/             # Mã nguồn Java (Controllers, Services, Repositories...)
 ├── src/main/resources/        # File cấu hình (application.properties)
 ├── target/                    # Thư mục chứa file sinh ra sau khi Build
 └── pom.xml                    # Cấu hình thư viện Maven
```
