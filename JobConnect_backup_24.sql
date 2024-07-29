-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: JobConnect
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Application`
--

DROP TABLE IF EXISTS `Application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Application` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_offerer_id` int NOT NULL,
  `job_seeker_id` int NOT NULL,
  `applied_at` datetime NOT NULL,
  `status` enum('Applied','Interview Scheduled','Accepted','Rejected','Cancelled') DEFAULT 'Applied',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_offerer_id` (`job_offerer_id`),
  KEY `job_seeker_id` (`job_seeker_id`),
  CONSTRAINT `application_ibfk_1` FOREIGN KEY (`job_offerer_id`) REFERENCES `JobOfferer` (`id`),
  CONSTRAINT `application_ibfk_2` FOREIGN KEY (`job_seeker_id`) REFERENCES `JobSeeker` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Application`
--

LOCK TABLES `Application` WRITE;
/*!40000 ALTER TABLE `Application` DISABLE KEYS */;
INSERT INTO `Application` VALUES (2,1,1,'2024-07-29 01:43:01','Applied','2024-07-29 01:43:01',NULL),(5,1,1,'2024-07-29 01:57:41','Interview Scheduled','2024-07-29 01:57:41',NULL),(6,1,2,'2024-07-29 01:57:41','Rejected','2024-07-29 01:57:41',NULL),(7,1,1,'2024-07-29 01:58:16','Interview Scheduled','2024-07-29 01:58:16',NULL),(8,1,2,'2024-07-29 01:58:16','Rejected','2024-07-29 01:58:16',NULL);
/*!40000 ALTER TABLE `Application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Interview`
--

DROP TABLE IF EXISTS `Interview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Interview` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_seeker_id` int NOT NULL,
  `job_offerer_id` int NOT NULL,
  `interview_date` datetime NOT NULL,
  `interview_status` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_seeker_id` (`job_seeker_id`),
  KEY `job_offerer_id` (`job_offerer_id`),
  CONSTRAINT `interview_ibfk_1` FOREIGN KEY (`job_seeker_id`) REFERENCES `JobSeeker` (`id`),
  CONSTRAINT `interview_ibfk_2` FOREIGN KEY (`job_offerer_id`) REFERENCES `JobOfferer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Interview`
--

LOCK TABLES `Interview` WRITE;
/*!40000 ALTER TABLE `Interview` DISABLE KEYS */;
INSERT INTO `Interview` VALUES (2,1,1,'2024-08-01 10:00:00','Scheduled','2024-07-29 01:43:01','2024-07-29 01:43:01',NULL);
/*!40000 ALTER TABLE `Interview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `JobOfferer`
--

DROP TABLE IF EXISTS `JobOfferer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `JobOfferer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `jobofferer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JobOfferer`
--

LOCK TABLES `JobOfferer` WRITE;
/*!40000 ALTER TABLE `JobOfferer` DISABLE KEYS */;
INSERT INTO `JobOfferer` VALUES (1,1,'TechCorp','2024-07-29 01:42:05','2024-07-29 01:42:05',NULL);
/*!40000 ALTER TABLE `JobOfferer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `JobPosting`
--

DROP TABLE IF EXISTS `JobPosting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `JobPosting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_title` varchar(100) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `description` text,
  `requirements` text,
  `salary` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `employer_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employer_id` (`employer_id`),
  CONSTRAINT `jobposting_ibfk_1` FOREIGN KEY (`employer_id`) REFERENCES `JobOfferer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JobPosting`
--

LOCK TABLES `JobPosting` WRITE;
/*!40000 ALTER TABLE `JobPosting` DISABLE KEYS */;
INSERT INTO `JobPosting` VALUES (1,'Software Engineer','TechCorp','New York','Develop and maintain software applications.','3+ years experience','100000','2024-07-29 01:42:05','2024-07-29 01:42:05',NULL,1);
/*!40000 ALTER TABLE `JobPosting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `JobSeeker`
--

DROP TABLE IF EXISTS `JobSeeker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `JobSeeker` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_id` (`user_id`),
  CONSTRAINT `jobseeker_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JobSeeker`
--

LOCK TABLES `JobSeeker` WRITE;
/*!40000 ALTER TABLE `JobSeeker` DISABLE KEYS */;
INSERT INTO `JobSeeker` VALUES (1,2,'John','Doe','2024-07-29 01:42:05','2024-07-29 01:42:05',NULL),(2,1,'Jane','Doe','2024-07-29 01:57:37','2024-07-29 01:57:37',NULL);
/*!40000 ALTER TABLE `JobSeeker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `sender_type` enum('job_seeker','job_offerer') NOT NULL,
  `receiver_type` enum('job_seeker','job_offerer') NOT NULL,
  `message_content` text NOT NULL,
  `sent_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
INSERT INTO `Message` VALUES (1,1,2,'job_seeker','job_offerer','This is a test message.','2024-07-29 01:55:32','2024-07-29 01:55:32',NULL);
/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Resume`
--

DROP TABLE IF EXISTS `Resume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Resume` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_seeker_id` int NOT NULL,
  `resume_content` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_seeker_id` (`job_seeker_id`),
  CONSTRAINT `resume_ibfk_1` FOREIGN KEY (`job_seeker_id`) REFERENCES `JobSeeker` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Resume`
--

LOCK TABLES `Resume` WRITE;
/*!40000 ALTER TABLE `Resume` DISABLE KEYS */;
INSERT INTO `Resume` VALUES (2,1,'This is the resume content.','2024-07-29 01:43:01','2024-07-29 01:43:01',NULL);
/*!40000 ALTER TABLE `Resume` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Revenue`
--

DROP TABLE IF EXISTS `Revenue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Revenue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` enum('job_offerer','job_seeker') NOT NULL,
  `subscribed` tinyint(1) NOT NULL,
  `subscription_plan` enum('monthly','yearly') NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `idx_subscription_plan` (`subscription_plan`),
  CONSTRAINT `revenue_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Revenue`
--

LOCK TABLES `Revenue` WRITE;
/*!40000 ALTER TABLE `Revenue` DISABLE KEYS */;
INSERT INTO `Revenue` VALUES (1,1,'job_offerer',1,'monthly','2024-07-01 00:00:00','2024-08-01 00:00:00','2024-07-29 05:42:06','2024-07-29 05:42:06',NULL);
/*!40000 ALTER TABLE `Revenue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `user_type` enum('job_seeker','job_offerer') NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'job_offerer@example.com','password123','job_offerer','2024-07-29 01:42:05','2024-07-29 01:42:05',NULL),(2,'job_seeker@example.com','password123','job_seeker','2024-07-29 01:42:05','2024-07-29 01:42:05',NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-29  2:21:01
