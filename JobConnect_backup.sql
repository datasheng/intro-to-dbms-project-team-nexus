-- MySQL dump 10.13  Distrib 9.0.0, for macos14 (arm64)
--
-- Host: localhost    Database: JobConnect
-- ------------------------------------------------------
-- Server version	9.0.0

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
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_seeker_id` int DEFAULT NULL,
  `job_posting_id` int DEFAULT NULL,
  `status` enum('Applied','Interview Scheduled','Accepted','Rejected','Cancelled') DEFAULT NULL,
  `applied_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `job_seeker_id` (`job_seeker_id`),
  KEY `fk_applications_job_posting_id` (`job_posting_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers` (`id`),
  CONSTRAINT `fk_applications_job_posting_id` FOREIGN KEY (`job_posting_id`) REFERENCES `job_posting` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,1,1,'Applied','2024-07-21 19:00:55',NULL,'2024-07-21 19:29:35'),(2,2,2,'Applied','2024-07-21 19:00:55',NULL,'2024-07-21 19:29:35'),(3,3,3,'Applied','2024-07-21 19:00:55',NULL,'2024-07-21 19:29:35'),(4,4,4,'Applied','2024-07-21 19:00:55',NULL,'2024-07-21 19:29:35'),(5,5,5,'Applied','2024-07-21 19:00:55',NULL,'2024-07-21 19:29:35');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interviews`
--

DROP TABLE IF EXISTS `interviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_seeker_id` int DEFAULT NULL,
  `job_offerer_id` int DEFAULT NULL,
  `interview_date` timestamp NULL DEFAULT NULL,
  `interview_status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_seeker_id` (`job_seeker_id`),
  KEY `fk_interviews_job_offerer_id` (`job_offerer_id`),
  CONSTRAINT `fk_interviews_job_offerer_id` FOREIGN KEY (`job_offerer_id`) REFERENCES `job_offerer` (`id`),
  CONSTRAINT `interviews_ibfk_1` FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interviews`
--

LOCK TABLES `interviews` WRITE;
/*!40000 ALTER TABLE `interviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `interviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_offerer`
--

DROP TABLE IF EXISTS `job_offerer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_offerer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `job_offerer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_offerer`
--

LOCK TABLES `job_offerer` WRITE;
/*!40000 ALTER TABLE `job_offerer` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_offerer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_posting`
--

DROP TABLE IF EXISTS `job_posting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_posting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_title` varchar(100) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `description` text,
  `requirements` text,
  `salary` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  `employer_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_job_offer_title` (`job_title`),
  KEY `fk_job_posting_job_offerer_id` (`user_id`),
  KEY `fk_job_posting_employer_id` (`employer_id`),
  CONSTRAINT `fk_job_posting_employer_id` FOREIGN KEY (`employer_id`) REFERENCES `job_offerer` (`id`),
  CONSTRAINT `chk_salary` CHECK (regexp_like(`salary`,_utf8mb4'^[0-9]+(.[0-9]{1,2})?$'))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_posting`
--

LOCK TABLES `job_posting` WRITE;
/*!40000 ALTER TABLE `job_posting` DISABLE KEYS */;
INSERT INTO `job_posting` VALUES (1,'Data Scientist','Tech Innovators Inc.','San Francisco, CA','Seeking a data scientist to analyze large datasets and develop predictive models.','Experience with Python, R, and machine learning algorithms.','120000','2024-07-21 19:00:35',NULL,'2024-07-21 19:31:25',NULL,NULL),(2,'Full-Stack Developer','Web Solutions LLC','New York, NY','Looking for a full-stack developer to build and maintain web applications.','Proficiency in JavaScript, React, Node.js, and SQL.','110000','2024-07-21 19:00:35',NULL,'2024-07-21 19:31:25',NULL,NULL),(3,'Robotics Engineer','Automation Experts','Boston, MA','Hiring a robotics engineer to design and develop robotic systems.','Knowledge of ROS, C++, and mechanical design principles.','100000','2024-07-21 19:00:35',NULL,'2024-07-21 19:31:25',NULL,NULL),(4,'Embedded Systems Engineer','IoT Innovations','Austin, TX','Need an embedded systems engineer to develop firmware for IoT devices.','Experience with C, C++, and microcontroller programming.','105000','2024-07-21 19:00:35',NULL,'2024-07-21 19:31:25',NULL,NULL),(5,'Process Engineer','Sustainable Energy Corp.','Seattle, WA','Seeking a process engineer to optimize manufacturing processes for energy efficiency.','Background in chemical engineering and process simulation software.','95000','2024-07-21 19:00:35',NULL,'2024-07-21 19:31:25',NULL,NULL);
/*!40000 ALTER TABLE `job_posting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_seekers`
--

DROP TABLE IF EXISTS `job_seekers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_seekers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_seekers`
--

LOCK TABLES `job_seekers` WRITE;
/*!40000 ALTER TABLE `job_seekers` DISABLE KEYS */;
INSERT INTO `job_seekers` VALUES (1,'Alice','Smith','2024-07-21 19:00:28',NULL,'2024-07-21 19:29:35',NULL),(2,'Bob','Johnson','2024-07-21 19:00:28',NULL,'2024-07-21 19:29:35',NULL),(3,'Carol','Williams','2024-07-21 19:00:28',NULL,'2024-07-21 19:29:35',NULL),(4,'David','Brown','2024-07-21 19:00:28',NULL,'2024-07-21 19:29:35',NULL),(5,'Eve','Davis','2024-07-21 19:00:28',NULL,'2024-07-21 19:29:35',NULL);
/*!40000 ALTER TABLE `job_seekers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `sender_type` enum('job_seeker','job_offerer') DEFAULT NULL,
  `receiver_type` enum('job_seeker','job_offerer') DEFAULT NULL,
  `message_content` text,
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_messages_sender_id` (`sender_id`),
  KEY `fk_messages_receiver_id` (`receiver_id`),
  CONSTRAINT `fk_messages_receiver_id` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_messages_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `job_seekers` (`id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `job_seekers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resumes`
--

DROP TABLE IF EXISTS `resumes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resumes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_seeker_id` int DEFAULT NULL,
  `resume_content` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_resumes_job_seeker_id` (`job_seeker_id`),
  CONSTRAINT `fk_resumes_job_seeker_id` FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers` (`id`),
  CONSTRAINT `resumes_ibfk_1` FOREIGN KEY (`job_seeker_id`) REFERENCES `job_seekers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resumes`
--

LOCK TABLES `resumes` WRITE;
/*!40000 ALTER TABLE `resumes` DISABLE KEYS */;
/*!40000 ALTER TABLE `resumes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_type` enum('job_seeker','job_offerer') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-22  2:34:55
