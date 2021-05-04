-- Create Database 
CREATE DATABASE IF NOT EXISTS noteAppDb;

-- Create user for backend application
CREATE USER IF NOT EXISTS 'server'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON noteAppDb.* TO 'server'@'localhost';

-- Create relational tables
-- userNote table
CREATE TABLE IF NOT EXISTS `noteAppDb`.`userNotes` (
    noteId      INT             AUTO_INCREMENT,
    title       VARCHAR(20)     NOT NULL,
    text        VARCHAR(500)    NOT NULL,
    isPublic    BOOLEAN         NOT NULL,
    author      VARCHAR(255)    NOT NULL,
    date        DATETIME        DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`noteId`))
ENGINE = InnoDB;

-- googleUser table
CREATE TABLE IF NOT EXISTS `noteAppDb`.`googleUser` (
    googleId    VARCHAR(255)    NOT NULL,
    name        VARCHAR(500)    NOT NULL,
    familyName  VARCHAR(500)    NOT NULL,
    givenName   VARCHAR(500)    NOT NULL,
    imageUrl    VARCHAR(500)    NOT NULL,
    email       VARCHAR(500)    NOT NULL,
    PRIMARY KEY (`googleId`))
ENGINE = InnoDB;

-- noteEdit table
CREATE TABLE IF NOT EXISTS `noteAppDb`.`noteEdit` (
    id          INT             AUTO_INCREMENT,
    profile     VARCHAR(255)    NOT NULL,
    note_id     INT             NOT NULL,
    date        DATETIME        DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

