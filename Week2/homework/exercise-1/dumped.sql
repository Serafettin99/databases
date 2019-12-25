-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: week2_hw
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `dept_no` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`dept_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (110,'Lorem Ipsum1','Lorem Ipsum Dolor1','Lorem Ipsum Dolor Sit Amet1'),(112,'Lorem Ipsum2','Lorem Ipsum Dolor2','Lorem Ipsum Dolor Sit Amet2'),(114,'Lorem Ipsum3','Lorem Ipsum Dolor3','Lorem Ipsum Dolor Sit Amet3'),(116,'Lorem Ipsum4','Lorem Ipsum Dolor4','Lorem Ipsum Dolor Sit Amet4'),(118,'Lorem Ipsum5','Lorem Ipsum Dolor5','Lorem Ipsum Dolor Sit Amet5'),(120,'Lorem Ipsum6','Lorem Ipsum Dolor6','Lorem Ipsum Dolor Sit Amet6'),(122,'Lorem Ipsum7','Lorem Ipsum Dolor7','Lorem Ipsum Dolor Sit Amet7'),(124,'Lorem Ipsum8','Lorem Ipsum Dolor8','Lorem Ipsum Dolor Sit Amet8'),(126,'Lorem Ipsum8','Lorem Ipsum Dolor8','Lorem Ipsum Dolor Sit Amet8'),(128,'Lorem Ipsum9','Lorem Ipsum Dolor9','Lorem Ipsum Dolor Sit Amet9'),(130,'Lorem Ipsum10','Lorem Ipsum Dolor10','Lorem Ipsum Dolor Sit Amet10');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_no` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `department_no` int(11) DEFAULT NULL,
  `manager` int(11) DEFAULT NULL,
  PRIMARY KEY (`employee_no`),
  KEY `F_K` (`manager`),
  KEY `department_no` (`department_no`),
  CONSTRAINT `F_K` FOREIGN KEY (`manager`) REFERENCES `employees` (`employee_no`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`department_no`) REFERENCES `departments` (`dept_no`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Wouter Kleijn',2801,'Sarphatistraat 380, Amsterdam',110,NULL),(2,'Federico Fusco',2760,'Sarphatistraat 378, Amsterdam',118,1),(3,'Tjebbe Schalij',2660,'Sarphatistraat 376, Amsterdam',116,1),(4,'George Hagi',5006,'Sarphatistraat 374, Amsterdam',116,3),(5,'Bulent Akin',2990,'Sarphatistraat 372, Amsterdam',114,3),(6,'Hakan Sukur',2480,'Sarphatistraat 370, Amsterdam',114,NULL),(7,'Arif Erdem',2660,'Sarphatistraat 368, Amsterdam',112,2),(8,'Emre Asik',2700,'Sarphatistraat 366, Amsterdam',110,2),(9,'Hakan Unsal',2651,'Sarphatistraat 364, Amsterdam',112,1),(10,'Rigobert Song',2601,'Sarphatistraat 362, Amsterdam',110,1);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-25 15:59:25
