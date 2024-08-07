﻿--
-- Script was generated by Devart dbForge Studio 2019 for MySQL, Version 8.2.23.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 09.07.2024 17:28:19
-- Server version: 5.7.40-log
-- Client version: 4.1
--

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

--
-- Set default database
--
USE coffee_le_coupage;

--
-- Drop table `acquisitions_details`
--
DROP TABLE IF EXISTS acquisitions_details;

--
-- Drop table `contragent`
--
DROP TABLE IF EXISTS contragent;

--
-- Drop table `__efmigrationshistory`
--
DROP TABLE IF EXISTS __efmigrationshistory;

--
-- Drop table `acquisitions`
--
DROP TABLE IF EXISTS acquisitions;

--
-- Drop procedure `get_orders_goods`
--
DROP PROCEDURE IF EXISTS get_orders_goods;

--
-- Drop table `orders`
--
DROP TABLE IF EXISTS orders;

--
-- Drop table `roles`
--
DROP TABLE IF EXISTS roles;

--
-- Drop procedure `get_workpoint_by_id`
--
DROP PROCEDURE IF EXISTS get_workpoint_by_id;

--
-- Drop procedure `get_wp_workpoints`
--
DROP PROCEDURE IF EXISTS get_wp_workpoints;

--
-- Drop table `workpoints`
--
DROP TABLE IF EXISTS workpoints;

--
-- Drop table `users`
--
DROP TABLE IF EXISTS users;

--
-- Drop procedure `get_good_packages`
--
DROP PROCEDURE IF EXISTS get_good_packages;

--
-- Drop table `good_package`
--
DROP TABLE IF EXISTS good_package;

--
-- Drop procedure `get_all_products`
--
DROP PROCEDURE IF EXISTS get_all_products;

--
-- Drop table `goods`
--
DROP TABLE IF EXISTS goods;

--
-- Drop table `packages`
--
DROP TABLE IF EXISTS packages;

--
-- Set default database
--
USE coffee_le_coupage;

--
-- Create table `packages`
--
CREATE TABLE packages (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  gross_weight decimal(8, 2) NOT NULL,
  is_active tinyint(1) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
AVG_ROW_LENGTH = 3276,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create table `goods`
--
CREATE TABLE goods (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  origin varchar(255) DEFAULT NULL,
  is_semifinished tinyint(1) NOT NULL,
  is_packaged tinyint(1) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 8,
AVG_ROW_LENGTH = 2730,
CHARACTER SET latin1,
COLLATE latin1_swedish_ci;

DELIMITER $$

--
-- Create procedure `get_all_products`
--
CREATE DEFINER = 'root'@'localhost'
PROCEDURE get_all_products ()
BEGIN

  SELECT

    g.id GoodId,
    g.name GoodName,
    g.origin GoodOrigin,
    g.is_packaged Este_Impachetat

  FROM goods g
  WHERE g.is_semifinished = 1

  ;

END
$$

DELIMITER ;

--
-- Create table `good_package`
--
CREATE TABLE good_package (
  good_package_id int(11) NOT NULL AUTO_INCREMENT,
  good_id int(11) NOT NULL,
  pack_id int(11) NOT NULL,
  is_active tinyint(1) NOT NULL,
  PRIMARY KEY (good_package_id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 3,
AVG_ROW_LENGTH = 8192,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create foreign key
--
ALTER TABLE good_package
ADD CONSTRAINT FK_good_package_good_id FOREIGN KEY (good_id)
REFERENCES goods (id);

--
-- Create foreign key
--
ALTER TABLE good_package
ADD CONSTRAINT FK_good_package_pack_id FOREIGN KEY (pack_id)
REFERENCES packages (id) ON DELETE NO ACTION;

DELIMITER $$

--
-- Create procedure `get_good_packages`
--
CREATE DEFINER = 'root'@'localhost'
PROCEDURE get_good_packages ()
BEGIN

  SELECT
    *
  FROM goods g
    JOIN good_package gp
      ON g.id = gp.good_id
    JOIN packages p
      ON gp.pack_id = p.id
  ;

END
$$

DELIMITER ;

--
-- Create table `users`
--
CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(100) NOT NULL,
  is_active tinyint(4) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 7,
AVG_ROW_LENGTH = 3276,
CHARACTER SET latin1,
COLLATE latin1_swedish_ci;

--
-- Create index `username` on table `users`
--
ALTER TABLE users
ADD UNIQUE INDEX username (username);

--
-- Create table `workpoints`
--
CREATE TABLE workpoints (
  point_id int(11) NOT NULL,
  wp_name varchar(100) NOT NULL,
  wp_address varchar(100) NOT NULL,
  user_id int(11) NOT NULL,
  wp_ip varchar(16) DEFAULT NULL,
  PRIMARY KEY (point_id)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 16384,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create foreign key
--
ALTER TABLE workpoints
ADD CONSTRAINT FK_workpoints_user_id FOREIGN KEY (user_id)
REFERENCES users (id);

DELIMITER $$

--
-- Create procedure `get_wp_workpoints`
--
CREATE DEFINER = 'root'@'localhost'
PROCEDURE get_wp_workpoints ()
BEGIN

  SELECT
    w.wp_name WorkpointName,
    w.wp_address WorkpointAddress,
    u.username Username


  FROM workpoints w
    JOIN users u
      ON w.user_id = u.id
  GROUP BY WorkpointName,
           WorkpointAddress,
           Username
  ;

END
$$

--
-- Create procedure `get_workpoint_by_id`
--
CREATE DEFINER = 'root'@'localhost'
PROCEDURE get_workpoint_by_id (IN id_point int)
BEGIN

  SELECT
    w.wp_name WorkpointName,
    w.wp_address WorkpointAddress,
    u.username Administrator


  FROM workpoints w
    JOIN users u
      ON w.user_id = u.id
  WHERE w.point_id = id_point
  GROUP BY WorkpointName,
           WorkpointAddress,
           Administrator
  ;

END
$$

DELIMITER ;

--
-- Create table `roles`
--
CREATE TABLE roles (
  id_role int(11) NOT NULL AUTO_INCREMENT,
  role_name varchar(255) NOT NULL,
  is_default tinyint(1) NOT NULL,
  user_id int(11) NOT NULL,
  PRIMARY KEY (id_role)
)
ENGINE = INNODB,
AUTO_INCREMENT = 3,
AVG_ROW_LENGTH = 8192,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create foreign key
--
ALTER TABLE roles
ADD CONSTRAINT FK_roles_user_id FOREIGN KEY (user_id)
REFERENCES users (id);

--
-- Create table `orders`
--
CREATE TABLE orders (
  id int(11) NOT NULL AUTO_INCREMENT,
  good_id int(11) NOT NULL,
  quantity decimal(8, 2) NOT NULL,
  good_package_id int(11) DEFAULT NULL,
  user_id int(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET latin1,
COLLATE latin1_swedish_ci;

--
-- Create foreign key
--
ALTER TABLE orders
ADD CONSTRAINT FK_orders_good_id FOREIGN KEY (good_id)
REFERENCES goods (id) ON DELETE NO ACTION;

--
-- Create foreign key
--
ALTER TABLE orders
ADD CONSTRAINT FK_orders_good_package_id FOREIGN KEY (good_package_id)
REFERENCES good_package (good_package_id);

--
-- Create foreign key
--
ALTER TABLE orders
ADD CONSTRAINT orders_ibfk_1 FOREIGN KEY (user_id)
REFERENCES users (id);

DELIMITER $$

--
-- Create procedure `get_orders_goods`
--
CREATE DEFINER = 'root'@'localhost'
PROCEDURE get_orders_goods ()
BEGIN

  SELECT
    o.id OrderNumber,
    o.good_id GoodId,
    g.name GoodName,
    o.quantity Quantity,
    o.good_package_id GoodPackagesId,
    g.origin Origin

  FROM orders o
    JOIN goods g
      ON o.id = g.id

  GROUP BY OrderNumber,
           GoodName,
           Quantity,
           GoodId,
           GoodPackagesId,
           Origin

  ;
END
$$

DELIMITER ;

--
-- Create table `acquisitions`
--
CREATE TABLE acquisitions (
  acquisitions_id int(11) NOT NULL AUTO_INCREMENT,
  type_blank varchar(10) NOT NULL,
  nr_acquisitions varchar(100) NOT NULL,
  date_entry datetime NOT NULL,
  contragent varchar(255) NOT NULL,
  deposit_entry decimal(8, 2) NOT NULL,
  sum_entry decimal(8, 2) NOT NULL,
  sum_tva decimal(8, 2) NOT NULL,
  user_id int(11) NOT NULL,
  PRIMARY KEY (acquisitions_id)
)
ENGINE = INNODB,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create foreign key
--
ALTER TABLE acquisitions
ADD CONSTRAINT FK_acquisitions_user_id FOREIGN KEY (user_id)
REFERENCES users (id);

--
-- Create table `__efmigrationshistory`
--
CREATE TABLE __efmigrationshistory (
  MigrationId varchar(150) NOT NULL,
  ProductVersion varchar(32) NOT NULL,
  PRIMARY KEY (MigrationId)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `contragent`
--
CREATE TABLE contragent (
  id int(11) NOT NULL AUTO_INCREMENT,
  cr_name varchar(255) NOT NULL,
  idno varchar(255) NOT NULL,
  comment varchar(255) DEFAULT NULL,
  full_name varchar(255) NOT NULL,
  is_partnership tinyint(1) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create table `acquisitions_details`
--
CREATE TABLE acquisitions_details (
  detail_id int(11) NOT NULL,
  acquisitions_id int(11) NOT NULL,
  good_id int(11) NOT NULL,
  good_package_id int(11) NOT NULL,
  PRIMARY KEY (detail_id)
)
ENGINE = INNODB,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

-- 
-- Dumping data for table packages
--
INSERT INTO packages VALUES
(1, 'Pachet', 1.00, 1),
(2, 'Cutie', 1.00, 1),
(3, 'Cutie', 4.00, 0),
(4, 'Tetrapac', 6.00, 1),
(5, 'Sticla', 5.00, 1);

-- 
-- Dumping data for table goods
--
INSERT INTO goods VALUES
(1, 'Ice Latte', 'Moldova', 1, 0),
(2, 'Capucinno', 'Moldova', 1, 0),
(3, 'Americano', 'Moldova', 1, 0),
(4, 'Espresso', 'Moldova', 1, 0),
(5, 'Cafea Boabe', 'Ucraina', 0, 1),
(6, 'Menta', 'Moldova', 0, 1),
(7, 'Sirop Tiramisu', 'Moldova', 0, 1);

-- 
-- Dumping data for table good_package
--
INSERT INTO good_package VALUES
(1, 6, 1, 1),
(2, 5, 3, 1);

-- 
-- Dumping data for table users
--
INSERT INTO users VALUES
(2, 'bogdan.rusu', '4d866f7f57ed84a65baa91e6de19f2f6cd6b999f1047f8ff85995b6d7ec616b4', 1),
(3, 'razvan.rusu', 'cac055446b5c8df90a649665b708c1dbf6da893ccc7fe8ffc2d53644d8bb1ed7', 1),
(4, 'radu.rimercean', 'b548d0b8a9ad02dc8cd8fea63d346190a3e7dcd20e3cb78095f43f5bc88e9f20', 1),
(5, 'sanea.globa', 'cd6ff01a8720e81b4f3b81eded8ebdcc5d0d78d133a4dda5b0095f26e9fa39e6', 1),
(6, 'cleopatra.stratan', '6e21bbc7364cfb5b2e6f338573dc1843b30bbd98742f8b3e006cbc9344559c2a', 0);

-- 
-- Dumping data for table __efmigrationshistory
--
-- Table coffee_le_coupage.__efmigrationshistory does not contain any data (it is empty)

-- 
-- Dumping data for table workpoints
--
INSERT INTO workpoints VALUES
(1, 'LE-1', 'str. Carierei 5', 3, '192.168.36.24');

-- 
-- Dumping data for table roles
--
INSERT INTO roles VALUES
(1, 'Administrator', 1, 2),
(2, 'Operator', 1, 3);

-- 
-- Dumping data for table orders
--
-- Table coffee_le_coupage.orders does not contain any data (it is empty)

-- 
-- Dumping data for table contragent
--
-- Table coffee_le_coupage.contragent does not contain any data (it is empty)

-- 
-- Dumping data for table acquisitions_details
--
-- Table coffee_le_coupage.acquisitions_details does not contain any data (it is empty)

-- 
-- Dumping data for table acquisitions
--
-- Table coffee_le_coupage.acquisitions does not contain any data (it is empty)

-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;