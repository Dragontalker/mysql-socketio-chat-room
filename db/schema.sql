DROP DATABASE IF EXISTS flux_db;

CREATE DATABASE flux_db;

USE flux_db;

CREATE TABLE login_info (
  id INTEGER AUTO_INCREMENT NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  access_key VARCHAR(255),
  isAdmin BOOLEAN DEFAULT false,
  PRIMARY KEY(id)
);

CREATE TABLE users (
  id INTEGER AUTO_INCREMENT NOT NULL,
  login_id INTEGER NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  display_name VARCHAR(30),
  avatar_dirct VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE messages (
  id INTEGER AUTO_INCREMENT NOT NULL,
  user_id INTEGER NOT NULL,
  channel_id INTEGER NOT NULL,
  message_body VARCHAR(300),
  PRIMARY KEY(id)
);

CREATE TABLE rooms (
  id INTEGER AUTO_INCREMENT NOT NULL,
  room_name VARCHAR(50),
  PRIMARY KEY(id)
);
