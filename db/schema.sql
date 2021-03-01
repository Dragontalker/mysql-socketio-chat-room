DROP DATABASE IF EXISTS flux_db;

CREATE DATABASE flux_db;

USE flux_db;

CREATE TABLE user_info (
  id INTEGER AUTO_INCREMENT NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  access_key VARCHAR(255),
  isAdmin BOOLEAN DEFAULT false,
  PRIMARY KEY(id)
);

