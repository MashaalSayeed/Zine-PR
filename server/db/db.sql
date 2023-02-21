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
    created_by INT,
    created_at DATE DEFAULT CURRENT_DATE,

    CONSTRAINT FK_product_created_by FOREIGN KEY(created_by)
        REFERENCES users(userid)
        ON DELETE SET NULL
);

CREATE TABLE productcategory (
    productid INT,
    categoryid INT,

    PRIMARY KEY (productid, categoryid),

    CONSTRAINT FK_product_id FOREIGN KEY (productid)
        REFERENCES product(productid)
        ON DELETE CASCADE,
    
    CONSTRAINT FK_category_id FOREIGN KEY (categoryid)
        REFERENCES category (categoryid)
        ON DELETE CASCADE
);

CREATE TABLE review (
    reviewid SERIAL PRIMARY KEY,
    productid INT,
    userid INT,
    rating INT,
    review VARCHAR(1024),
    created_at DATE DEFAULT CURRENT_DATE,

    CONSTRAINT FK_product_id FOREIGN KEY(productid)
        REFERENCES product(productid)
        ON DELETE CASCADE,

    CONSTRAINT FK_user_id FOREIGN KEY(userid)
        REFERENCES users(userid)
        ON DELETE CASCADE
);