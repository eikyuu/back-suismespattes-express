-- MariaDB dump 10.19  Distrib 10.11.2-MariaDB, for osx10.17 (x86_64)
--
-- Host: localhost    Database: aufildespattes
-- ------------------------------------------------------
-- Server version	10.11.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `walk`
--

DROP TABLE IF EXISTS `walk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `walk` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `city` varchar(255) NOT NULL,
  `postal_code` varchar(5) NOT NULL,
  `street` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `water_point` tinyint(4) NOT NULL DEFAULT 0,
  `processionary_caterpillar_alert` tinyint(4) NOT NULL DEFAULT 0,
  `cyanobacteria_alert` tinyint(4) NOT NULL DEFAULT 0,
  `note` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `obligatory_leash` enum('YES','NO','RECOMANDED') NOT NULL DEFAULT 'NO',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_bebedd4223a423e838426c8ed1` (`name`),
  UNIQUE KEY `IDX_1963bfdf042910ae9699e3a0cf` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `walk`
--

LOCK TABLES `walk` WRITE;
/*!40000 ALTER TABLE `walk` DISABLE KEYS */;
INSERT INTO `walk` VALUES
('54ac451d-30d5-4775-ba71-c84f7ff2da02','Prom. du Bois de la Rabelaiss','prom-du-bois-de-la-rabelaiss','Avec 25 hectares, il constitue un maillon important de la trame verte et bleue métropolitaine avec un espace de promenade en milieu boisé (rue de Mon Repos).Vraiment Abordable et sympa avec un chien, petit coin ou nager pour nos toutous','St-cyr-sur-loire','37540','Prom. du Bois de la Rabelais','FR',47.4231,0.668688,1,0,0,4,'2023-08-16 22:51:18.774422','2023-08-16 22:51:18.774422','NO'),
('68f5c346-a227-4198-bdaf-f0b0dd6af20a','Prom. du Bois de la Rabelaissssssssss','prom-du-bois-de-la-rabelaissssssssss','Avec 25 hectares, il constitue un maillon important de la trame verte et bleue métropolitaine avec un espace de promenade en milieu boisé (rue de Mon Repos).Vraiment Abordable et sympa avec un chien, petit coin ou nager pour nos toutous','St-cyr-sur-loire','37540','Prom. du Bois de la Rabelais','FR',47.4231,0.668688,1,0,0,4,'2023-08-16 22:49:41.092744','2023-08-16 22:49:41.092744','NO'),
('6f458c45-950f-456f-b38f-cbd0c5aa76d0','Prom. du Bois de la Rabelais','prom-du-bois-de-la-rabelais','Avec 25 hectares, il constitue un maillon important de la trame verte et bleue métropolitaine avec un espace de promenade en milieu boisé (rue de Mon Repos).Vraiment Abordable et sympa avec un chien, petit coin ou nager pour nos toutous','St-cyr-sur-loire','37540','Prom. du Bois de la Rabelais','FR',47.4231,0.668688,1,0,0,4,'2023-08-16 22:51:00.034466','2023-08-16 22:51:00.034466','NO'),
('870fe3f6-391e-453a-9622-640dc59726b9','fffffhfhf','fffffhfhf','fghhfghfgghfghfgghf','Saint-cyr-sur-loire','37540','18 Av. André Ampère','FR',47.4352,0.655984,0,0,0,2,'2023-08-14 23:43:21.703343','2023-08-14 23:43:21.703343','NO'),
('a6e5e722-2b50-4159-a312-2e2f89d458af','dddddddd','dddddddd','dddfdfdfdfdfsfs','Saint-Cyr-sur-Loire','37540','19 Av. André Ampère','FR',47.4226,0.659807,0,0,0,2,'2023-08-16 22:52:46.262568','2023-08-16 22:52:46.262568','NO'),
('d995b1b2-b6f5-418a-a533-019886a7e89b','ghghfhgfhgf','ghghfhgfhgf','hghfghfghfghgfhgfhgf','Saint-cyr-sur-loire','37540','18 Av. André Ampère','FR',47.4352,23432400000,0,0,0,2,'2023-08-14 23:42:59.788567','2023-08-14 23:42:59.788567','NO');
/*!40000 ALTER TABLE `walk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `walk_image`
--

DROP TABLE IF EXISTS `walk_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `walk_image` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `walkId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_193dad111e9c3436d0907041d88` (`walkId`),
  CONSTRAINT `FK_193dad111e9c3436d0907041d88` FOREIGN KEY (`walkId`) REFERENCES `walk` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `walk_image`
--

LOCK TABLES `walk_image` WRITE;
/*!40000 ALTER TABLE `walk_image` DISABLE KEYS */;
INSERT INTO `walk_image` VALUES
('05716f02-270e-4a2c-a3c6-81186601102f','image-1692219237008.jpeg','68f5c346-a227-4198-bdaf-f0b0dd6af20a'),
('24303e42-6890-41f9-b284-9cfc40bde5e5','image-1692219044186.jpeg','68f5c346-a227-4198-bdaf-f0b0dd6af20a'),
('41c0656d-260c-405d-b9f7-3888cf77caa3','image-1692049379818.jpeg','d995b1b2-b6f5-418a-a533-019886a7e89b'),
('549ffff7-04be-404a-a23e-595ef6c456fd','image-1692219166286.jpeg','a6e5e722-2b50-4159-a312-2e2f89d458af'),
('bc225ac6-46ec-4729-b4f9-da41f89fc64d','image-1692049401722.jpeg','870fe3f6-391e-453a-9622-640dc59726b9'),
('bef7b6e2-4963-4352-b2d5-7addb98b63a0','image-1692219066638.jpeg','6f458c45-950f-456f-b38f-cbd0c5aa76d0'),
('ce528334-a289-49df-9b80-8aade240e473','image-1692219083606.jpeg','54ac451d-30d5-4775-ba71-c84f7ff2da02');
/*!40000 ALTER TABLE `walk_image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18 10:17:14
