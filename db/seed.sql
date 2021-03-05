-- For table: login_info
INSERT INTO login_info (user_name, user_password, isAdmin) 
VALUES ('admin','admin', true);

INSERT INTO login_info (user_name, user_password) 
VALUES ('guest','guest');

INSERT INTO login_info (user_name, user_password) 
VALUES ('guest2','guest2');


-- For table: users
INSERT INTO users (login_id, first_name, last_name, display_name)
VALUES (1, 'Admin', 'Istrator', 'Adminstrator');

INSERT INTO users (login_id, first_name, last_name, display_name)
VALUES (2, 'Guest', 'One', 'Guest 1');

INSERT INTO users (login_id, first_name, last_name, display_name)
VALUES (3, 'Guest', 'Two', 'Guest 2');


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
INSERT INTO rooms (room_name)
VALUES ('Main Room');

INSERT INTO rooms (room_name)
VALUES ('Coding');

INSERT INTO rooms (room_name)
VALUES ('Meeting');