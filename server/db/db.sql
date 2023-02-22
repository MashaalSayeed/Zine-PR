CREATE DATABASE zinepr;

CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE category (
    categoryid SERIAL PRIMARY KEY,
    category_name VARCHAR(32) NOT NULL
);

CREATE TABLE product (
    productid SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    description VARCHAR(1024),
    image CHAR(36),
    price FLOAT,
    categoryid INT,
    created_by INT,
    created_at DATE DEFAULT CURRENT_DATE,

    CONSTRAINT FK_product_category FOREIGN KEY(categoryid)
        REFERENCES category(categoryid)
        ON DELETE SET NULL

    CONSTRAINT FK_product_created_by FOREIGN KEY(created_by)
        REFERENCES users(userid)
        ON DELETE SET NULL
);

CREATE TABLE review (
    reviewid SERIAL PRIMARY KEY,
    productid INT,
    userid INT,
    rating FLOAT,
    title VARCHAR(128),
    review VARCHAR(1024),
    created_at DATE DEFAULT CURRENT_DATE,

    CONSTRAINT FK_product_id FOREIGN KEY(productid)
        REFERENCES product(productid)
        ON DELETE CASCADE,

    CONSTRAINT FK_user_id FOREIGN KEY(userid)
        REFERENCES users(userid)
        ON DELETE CASCADE
);

-- Add categories here
INSERT INTO category (category_name) VALUES 
    ('Electronics'), ('Appliances'), ('Food'), ('Beverages'), ('Health'), 
    ('Home'), ('Furniture'), ('Vehicles'), ('Pets'), ('Beauty'),
    ('Books'), ('Toys'), ('Games'), ('Kitchen'), ('Tools'), ('Sports'),
    ('Clothes'), ('Services');