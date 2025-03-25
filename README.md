# BMS-Angular

after connecting the mysql database successfully 

let's create table


CREATE TABLE author (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(20),
    isbn INT
);

CREATE TABLE books (
    isbn INT PRIMARY KEY,
    title VARCHAR(100),
    genre VARCHAR(50),
    author_id INT,
    price INT,
    pubDate DATE
);
