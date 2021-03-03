-- For table: login_info
INSERT INTO login_info (user_email, user_password, isAdmin) 
VALUES ('chang.xiao@flux.com','adminPassword', true);

INSERT INTO login_info (user_email, user_password) 
VALUES ('sam.kim@flux.com','guessPassword1');

INSERT INTO login_info (user_email, user_password) 
VALUES ('micheal.wong@flux.com','guessPassword2');

INSERT INTO login_info (user_email, user_password) 
VALUES ('richard.yang@flux.com','guestPassword3');


-- For table: users
INSERT INTO users (login_id, first_name, last_name, display_name)
VALUES (1, 'Chang', 'Xiao', 'Adminstrator');

INSERT INTO users (login_id, first_name, last_name, display_name)
VALUES (2, 'Sam', 'Kim', 'Guest 1');

INSERT INTO users (login_id, first_name, last_name, display_name)
VALUES (3, 'Micheal', 'Wong', 'Guest 2');

INSERT INTO users (login_id, first_name, last_name, display_name)
VALUES (4, 'Richard', 'Yang', 'Guest 3');


-- For table: messages
INSERT INTO messages (user_id, channel_id, message_body)
VALUES (1, 1, 'Hello everybody!');

INSERT INTO messages (user_id, channel_id, message_body)
VALUES (2, 1, 'Hello Chang!');

INSERT INTO messages (user_id, channel_id, message_body)
VALUES (3, 1, 'Morning guys!');

INSERT INTO messages (user_id, channel_id, message_body)
VALUES (4, 1, 'Hey people, how is it going?');

INSERT INTO messages (user_id, channel_id, message_body)
VALUES (1, 1, 'Good! We can start our project now!');


-- For table: rooms
INSERT INTO rooms (channel_name)
VALUES ('Main Room');

INSERT INTO rooms (channel_name)
VALUES ('Coding');

INSERT INTO rooms (channel_name)
VALUES ('Meeting');