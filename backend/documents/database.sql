CREATE DATABASE `itc` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE itc;

CREATE TABLE `itc`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(145) NULL,
  `last_name` VARCHAR(145) NULL,
  `email` VARCHAR(145) NULL,
  `password` VARCHAR(245) NULL,
  `created` DATETIME NULL,
  `update_time` DATETIME NULL,
  PRIMARY KEY (`id`));
