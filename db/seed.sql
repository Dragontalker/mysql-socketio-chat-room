-- For table: login_info
INSERT INTO login_info (user_email, user_password, isAdmin) 
VALUES ('chang.xiao@flux.com','adminPassword', true);

INSERT INTO login_info (user_email, user_password) 
VALUES ('sam.kim@flux.com','guessPassword1');

INSERT INTO login_info (user_email, user_password) 
VALUES ('micheal.wong@flux.com','guessPassword2');

INSERT INTO login_info (user_email, user_password) 
VALUES ('richard.yang@flux.com','guestPassword3');


-- For tablee: user_info
INSERT INTO user_info (login_id, first_name, last_name, display_name)
VALUES (1, 'Chang', 'Xiao', 'Adminstrator');

INSERT INTO user_info (login_id, first_name, last_name, display_name)
VALUES (2, 'Sam', 'Kim', 'Guest 1');

INSERT INTO user_info (login_id, first_name, last_name, display_name)
VALUES (3, 'Micheal', 'Wong', 'Guest 2');

INSERT INTO user_info (login_id, first_name, last_name, display_name)
VALUES (4, 'Richard', 'Yang', 'Guest 3');
