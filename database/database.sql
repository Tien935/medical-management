-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: medical_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `appointment_time` time(6) DEFAULT NULL,
  `doctor_id` bigint DEFAULT NULL,
  `patient_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmujeo4tymoo98cmf7uj3vsv76` (`doctor_id`),
  KEY `FKopb2h9yhin1rb4dqote8bws6w` (`patient_id`),
  CONSTRAINT `FKmujeo4tymoo98cmf7uj3vsv76` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`),
  CONSTRAINT `FKopb2h9yhin1rb4dqote8bws6w` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES ('PK-1023','2026-05-16 04:51:36.056866','2026-05-19','Bệnh nhân: Nguyen Van T\nSĐT: 86886\nLý do: ','Đã khám','09:30:00.000000',151,1),('PK-1174','2026-05-09 15:37:34.653020','2026-05-15',NULL,'CANCELLED','10:00:00.000000',NULL,1),('PK-1651','2026-05-12 23:30:01.539607','2026-05-13','Bệnh nhân: Nguyen Van T\nSĐT: 0123456789\nLý do: ','CANCELLED','08:00:00.000000',3,1),('PK-1769','2026-05-16 04:37:19.516236','2026-05-16','Bệnh nhân: Nguyen Van T\nSĐT: 27272727\nLý do: qeqeqeq','Đã khám','08:00:00.000000',151,1),('PK-2314','2026-05-12 22:33:48.936987','2026-05-15','Bệnh nhân: Nguyen Van T\nSĐT: 313131\nLý do: âsasa','CANCELLED','09:00:00.000000',7,1),('PK-3618','2026-05-12 22:12:41.910859','2026-05-15',NULL,'COMPLETED','09:00:00.000000',1,1),('PK-4130','2026-05-16 04:57:46.553375','2026-05-20','Bệnh nhân: NVT\nSĐT: 153525\nLý do: daudau','CONFIRMED','09:00:00.000000',151,51),('PK-4482','2026-05-13 00:34:41.614613','2026-05-13','Bệnh nhân: Nguyen Van T\nSĐT: 0123456789\nLý do: 11','Đã khám','08:00:00.000000',151,1),('PK-4870','2026-05-12 23:32:30.078565','2026-05-13','Bệnh nhân: Nguyen Van T\nSĐT: 1244241\nLý do: ','CONFIRMED','08:00:00.000000',101,1),('PK-5706','2026-05-10 22:28:06.913377','2026-05-15',NULL,'COMPLETED','10:30:00.000000',1,1),('PK-6364','2026-05-09 15:48:48.629035','2026-05-14',NULL,'COMPLETED','10:00:00.000000',1,1),('PK-7547','2026-05-16 04:55:43.974624','2026-05-20','Bệnh nhân: Nguyen Van T\nSĐT: 113131\nLý do: daubung','CONFIRMED','08:00:00.000000',151,1),('PK-8764','2026-05-12 22:18:21.687010','2026-05-16',NULL,'COMPLETED','15:30:00.000000',7,1),('PK-9105','2026-05-13 00:32:56.008819','2026-05-13','Bệnh nhân: Nguyen Van T\nSĐT: 1244241\nLý do: ','Đã khám','08:00:00.000000',151,1),('PK-9712','2026-05-12 23:51:04.753287','2026-05-13','Bệnh nhân: Nguyen Van T\nSĐT: 0123456789\nLý do: ','COMPLETED','08:00:00.000000',151,1);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id` bigint NOT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `specialty_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKt1f6cueqyjwx5ghew9ar1exe3` (`user_id`),
  KEY `FKb4ymcpidvwfn4kybv4adfvxcm` (`specialty_id`),
  CONSTRAINT `FKb4ymcpidvwfn4kybv4adfvxcm` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`),
  CONSTRAINT `FKe9pf5qtxxkdyrwibaevo9frtk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,'TIensi','nnnndada','10 nam','','nnvdv',1,NULL),(2,'Thạc sĩ','Yêu trẻ và tận tâm với công việc chăm sóc sức khỏe nhi nhi.','10 năm kinh nghiệm','https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80','ThS.BS. Trần Thị Bình',2,NULL),(3,'Bác sĩ chuyên khoa II','Chuyên gia tim mạch hàng đầu, đã thực hiện nhiều ca phẫu thuật phức tạp.','20 năm kinh nghiệm','https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80','BSCKII. Lê Văn Cường',3,NULL),(4,'Bác sĩ chuyên khoa I','Chuyên khoa sản phụ khoa, đồng hành cùng mẹ bầu trong suốt thai kỳ.','12 năm kinh nghiệm','https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80','BS. Phạm Minh Đức',4,NULL),(5,'Bác sĩ','Chuyên điều trị các bệnh lý về da và thẩm mỹ nội khoa.','8 năm kinh nghiệm','https://images.unsplash.com/photo-1559839734-2b71f15367ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80','BS. Hoàng Thu Hà',5,NULL),(6,'Thạc sĩ','Nhiều kinh nghiệm trong lĩnh vực phục hình răng và phẫu thuật hàm mặt.','18 năm kinh nghiệm','https://images.unsplash.com/photo-1622902046580-2b47f47f0871?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80','ThS.BS. Đỗ Kim Liên',6,NULL),(7,'Thạc sĩ, Bác sĩ','Chuyên gia nội tổng quát với nhiều năm kinh nghiệm tại các bệnh viện lớn.','15 năm kinh nghiệm','https://images.unsplash.com/photo-1612349317150-e413f6a5b1a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80','BS. Nguyễn Văn An',1,2),(51,'DH','TEngu','10 nam','','TE',2,NULL),(101,'DH','Test desc','11 nam','','Tester',1,101),(151,'','','','','BSA',1,3);
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors_seq`
--

DROP TABLE IF EXISTS `doctors_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors_seq`
--

LOCK TABLES `doctors_seq` WRITE;
/*!40000 ALTER TABLE `doctors_seq` DISABLE KEYS */;
INSERT INTO `doctors_seq` VALUES (201);
/*!40000 ALTER TABLE `doctors_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_records`
--

DROP TABLE IF EXISTS `medical_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_records` (
  `id` bigint NOT NULL,
  `diagnosis` text,
  `examination_date` datetime(6) DEFAULT NULL,
  `notes` text,
  `prescription` text,
  `symptoms` text,
  `appointment_id` varchar(255) DEFAULT NULL,
  `doctor_id` bigint DEFAULT NULL,
  `patient_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKifeec8p5v06rt258odelw8s7j` (`appointment_id`),
  KEY `FKtny13k9v4o58styd47st3s2l5` (`doctor_id`),
  KEY `FKe3g9v0pbec2843wd1rxeb0is3` (`patient_id`),
  CONSTRAINT `FKe3g9v0pbec2843wd1rxeb0is3` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKifeec8p5v06rt258odelw8s7j` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`),
  CONSTRAINT `FKtny13k9v4o58styd47st3s2l5` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_records`
--

LOCK TABLES `medical_records` WRITE;
/*!40000 ALTER TABLE `medical_records` DISABLE KEYS */;
INSERT INTO `medical_records` VALUES (1,'a','2026-05-13 00:33:42.694954','a','a','a','PK-9105',151,1),(2,'eqeq','2026-05-13 01:07:37.141257','eqeqeq','eqeq','eqeqe','PK-4482',151,1),(51,'da','2026-05-16 04:39:33.041345','ada','dâd','đaad','PK-1769',151,1),(52,'2121','2026-05-16 04:52:29.757058','2121','2121','121212','PK-1023',151,1);
/*!40000 ALTER TABLE `medical_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_records_seq`
--

DROP TABLE IF EXISTS `medical_records_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_records_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_records_seq`
--

LOCK TABLES `medical_records_seq` WRITE;
/*!40000 ALTER TABLE `medical_records_seq` DISABLE KEYS */;
INSERT INTO `medical_records_seq` VALUES (101);
/*!40000 ALTER TABLE `medical_records_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialties`
--

DROP TABLE IF EXISTS `specialties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialties` (
  `id` bigint NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialties`
--

LOCK TABLES `specialties` WRITE;
/*!40000 ALTER TABLE `specialties` DISABLE KEYS */;
INSERT INTO `specialties` VALUES (1,'adada',NULL,'Nội',''),(2,'ada',NULL,'ngoại',''),(3,'Điều trị bệnh tim',NULL,'Tim mạch',NULL),(4,'Chăm sóc sức khỏe phụ nữ',NULL,'Sản phụ khoa',NULL),(5,'Điều trị bệnh về da',NULL,'Da liễu',NULL),(6,'Điều trị răng miệng',NULL,'Răng hàm mặt',NULL);
/*!40000 ALTER TABLE `specialties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialties_seq`
--

DROP TABLE IF EXISTS `specialties_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialties_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialties_seq`
--

LOCK TABLES `specialties_seq` WRITE;
/*!40000 ALTER TABLE `specialties_seq` DISABLE KEYS */;
INSERT INTO `specialties_seq` VALUES (51);
/*!40000 ALTER TABLE `specialties_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'aaaa@gmail.com','Nguyen Van T','123456',NULL,'PATIENT','nguyenvant'),(2,NULL,'nva@gmail.com','nva','123456',NULL,'ADMIN','nguyenvana'),(3,NULL,'BS@gmail.com','BSA','123456','31313231','DOCTOR','Bacsia'),(51,NULL,'TT@gmail.com','NVT','123456',NULL,'PATIENT','nguyenvantt'),(101,NULL,'','Tester','123456','','DOCTOR','NguyenvanTi'),(151,NULL,'TE@gmail.com','NVTE','123456','1212121','DOCTOR','BacSiTE');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_seq`
--

DROP TABLE IF EXISTS `users_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_seq`
--

LOCK TABLES `users_seq` WRITE;
/*!40000 ALTER TABLE `users_seq` DISABLE KEYS */;
INSERT INTO `users_seq` VALUES (201);
/*!40000 ALTER TABLE `users_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-16  5:12:31
