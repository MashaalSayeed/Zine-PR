--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-02-22 23:20:38 IST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16439)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    categoryid integer NOT NULL,
    category_name character varying(32) NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16438)
-- Name: category_categoryid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_categoryid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_categoryid_seq OWNER TO postgres;

--
-- TOC entry 3632 (class 0 OID 0)
-- Dependencies: 216
-- Name: category_categoryid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_categoryid_seq OWNED BY public.category.categoryid;


--
-- TOC entry 219 (class 1259 OID 16446)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    productid integer NOT NULL,
    name character varying(128) NOT NULL,
    description character varying(1024),
    image character(64),
    price double precision,
    created_by integer,
    created_at date DEFAULT CURRENT_DATE,
    categoryid integer
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16445)
-- Name: product_productid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_productid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_productid_seq OWNER TO postgres;

--
-- TOC entry 3633 (class 0 OID 0)
-- Dependencies: 218
-- Name: product_productid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_productid_seq OWNED BY public.product.productid;


--
-- TOC entry 221 (class 1259 OID 16501)
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    reviewid integer NOT NULL,
    productid integer,
    userid integer,
    rating double precision,
    title character varying(128),
    review character varying(1024),
    created_at date DEFAULT CURRENT_DATE
);


ALTER TABLE public.review OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16500)
-- Name: review_reviewid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.review_reviewid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_reviewid_seq OWNER TO postgres;

--
-- TOC entry 3634 (class 0 OID 0)
-- Dependencies: 220
-- Name: review_reviewid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.review_reviewid_seq OWNED BY public.review.reviewid;


--
-- TOC entry 215 (class 1259 OID 16425)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(32) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    created_at date DEFAULT CURRENT_DATE
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16424)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO postgres;

--
-- TOC entry 3635 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- TOC entry 3456 (class 2604 OID 16442)
-- Name: category categoryid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN categoryid SET DEFAULT nextval('public.category_categoryid_seq'::regclass);


--
-- TOC entry 3457 (class 2604 OID 16449)
-- Name: product productid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN productid SET DEFAULT nextval('public.product_productid_seq'::regclass);


--
-- TOC entry 3459 (class 2604 OID 16504)
-- Name: review reviewid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review ALTER COLUMN reviewid SET DEFAULT nextval('public.review_reviewid_seq'::regclass);


--
-- TOC entry 3454 (class 2604 OID 16428)
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- TOC entry 3622 (class 0 OID 16439)
-- Dependencies: 217
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category (categoryid, category_name) VALUES (2, 'Electronics');
INSERT INTO public.category (categoryid, category_name) VALUES (3, 'Appliances');
INSERT INTO public.category (categoryid, category_name) VALUES (4, 'Food');
INSERT INTO public.category (categoryid, category_name) VALUES (5, 'Beverages');
INSERT INTO public.category (categoryid, category_name) VALUES (6, 'Health');
INSERT INTO public.category (categoryid, category_name) VALUES (7, 'Home');
INSERT INTO public.category (categoryid, category_name) VALUES (8, 'Furniture');
INSERT INTO public.category (categoryid, category_name) VALUES (9, 'Vehicles');
INSERT INTO public.category (categoryid, category_name) VALUES (10, 'Pets');
INSERT INTO public.category (categoryid, category_name) VALUES (11, 'Beauty');
INSERT INTO public.category (categoryid, category_name) VALUES (12, 'Books');
INSERT INTO public.category (categoryid, category_name) VALUES (13, 'Toys');
INSERT INTO public.category (categoryid, category_name) VALUES (14, 'Games');
INSERT INTO public.category (categoryid, category_name) VALUES (15, 'Kitchen');
INSERT INTO public.category (categoryid, category_name) VALUES (16, 'Tools');
INSERT INTO public.category (categoryid, category_name) VALUES (17, 'Sports');
INSERT INTO public.category (categoryid, category_name) VALUES (18, 'Clothes');
INSERT INTO public.category (categoryid, category_name) VALUES (19, 'Services');


--
-- TOC entry 3624 (class 0 OID 16446)
-- Dependencies: 219
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product (productid, name, description, image, price, created_by, created_at, categoryid) VALUES (7, 'Apple iPhone 14 Pro', 'iPhone 14 Pro. With Dynamic Island. Crash Detection. A 48MP camera for up to 4x the resolution. 5G connectivity. Four colours.', 'MTY3NzAxNDY3NzcxOS04NTc2ODAwODU=.jpg                            ', 1000, 1, '2023-02-22', 2);
INSERT INTO public.product (productid, name, description, image, price, created_by, created_at, categoryid) VALUES (8, 'Samsung Galaxy S23 Ultra', 'Meet the new Galaxy S23 Ultra, designed with the planet in mind and equipped with a built-in S Pen, Nightography camera and powerful chip for epic gaming.', 'MTY3NzA3ODc0NjIxMS02NTQyMDY0NjQ=.jpg                            ', 1194, 3, '2023-02-22', 2);
INSERT INTO public.product (productid, name, description, image, price, created_by, created_at, categoryid) VALUES (9, 'Google Pixel 7', 'Experience smooth operation and brilliant user interface with the 5G-ready Google Pixel 7 smartphone that comes loaded with innovative features. Google Tensor G2 makes the Pixel 7 faster, more efficient, and more secure and it delivers even more helpful features. Furthermore, the Pixel 7 Camera takes incredible photos and videos in stunning colour and detail. It includes Super Res Zoom so that you can get super-sharp close-ups without an extra telephoto lens. Additionally, the Pixel 7''s 16.002 cm (6.3) display is super sharp, with rich, vivid colours. And it''s fast and responsive for smoother gaming, scrolling, and moving between apps.', 'MTY3NzA3OTYxNTcxMy01MjAxOTgyOQ==.jpg                            ', 599, 3, '2023-02-22', 2);
INSERT INTO public.product (productid, name, description, image, price, created_by, created_at, categoryid) VALUES (10, 'LG UQ7500 (55 inch) Ultra HD (4K) LED', 'Get larger than life visuals and unmatched movie watching experience on the LG UHD TV. This TV comes with a UHD 4K resolution display so that you can get a true-to-life visual quality and vivid colours. and streaming services with the With pre-installed streaming services on this TV, you can conveniently browse through your preferred content throughout the day. Whether you’re playing an action-packed game, or an adventure game, the Game Optimiser, Gaming Dashboard, and HGiG technology can make your gaming experience fast and seamless.', 'MTY3NzA4MTc1MDk3MC01ODc2NTA5MjM=.jpg                            ', 585, 3, '2023-02-22', 3);
INSERT INTO public.product (productid, name, description, image, price, created_by, created_at, categoryid) VALUES (11, 'Cadbury Oreo Original Vanilla Creme Biscuit, 120 g', 'Rich, smooth vanilla crã¨me sandwiched between two crunchy chocolate biscuits
The perfect pack for snacking at home or sharing with your family or friends
Give yourself a delicious treat today and twist, lick and dunk an oreo', 'MTY3NzA4MjA4ODk0NC0yMTU1NTkzMjQ=.jpg                            ', 0.34, 3, '2023-02-22', 4);
INSERT INTO public.product (productid, name, description, image, price, created_by, created_at, categoryid) VALUES (12, 'Pepsi Soft Drink, 750 ml', 'Pepsi is the pop that shakes things up.
Big on taste. Little on calories
Contains caffeine', 'MTY3NzA4MjI3MTk3NC0xMjIxNDE2ODg=.jpg                            ', 0.6, 3, '2023-02-22', 5);
INSERT INTO public.product (productid, name, description, image, price, created_by, created_at, categoryid) VALUES (13, 'Ferrero Rocher Premium Chocolates 24 Pieces, 300 g', 'Whole hazelnut covered in milk chocolate. A creamy filling, a crunchy wafer and a delicious hazelnut centre;And thanks to its inimitable golden wrapper and paper cup Ferrero Rocher is even more unique and special

Ferrero Rocher offers a unique taste experience of contrasting layers that engages all the senses

Ferrero Rocher is available in different packs making it ideal for sharing with your loved ones, for giving as the perfect gift or even for indulging yourself', 'MTY3NzA4MjQ1NjAxMy05MzY0MDY1ODY=.jpg                            ', 10.53, 3, '2023-02-22', 4);
INSERT INTO public.product (productid, name, description, image, price, created_by, created_at, categoryid) VALUES (14, 'YONEX Graphite Badminton Racquet Astrox Lite 27i', 'SLIM SHAFT - More speed = More power. Designed to slice through the air, generating speedy power

ISOMETRIC - Enlarged Sweet Spot compared to a conventional round frame, a square-shaped ISOMETRIC racquet generates a larger sweet spot by optimizing the intersection of the main and cross strings. ISOMETRIC delivers greater control without sacrificing power

AERO+BOX FRAME - Combines solid hitting feel and quick swing.; Control Support CAP - Sharp Maneuverability. The control support cap provides an 88% wider flat surface compared with an ordinary racquet for easier gripping, fast follow-through and the sharpest maneuverability

ROTATIONAL GENERATOR SYSTEM - For Maximum Control by applying the counterbalance theory, weight is distributed throughout the grip end, frame top and the joint for maximum control. The transition to the next shot can be performed smoothly with a rapid succession', 'MTY3NzA4NDQ0MTA1OS02NTM0NzY1MTg=.jpg                            ', 30, 3, '2023-02-22', 17);
INSERT INTO public.product (productid, name, description, image, price, created_by, created_at, categoryid) VALUES (15, 'Apple 2020 MacBook Air Laptop M1 chip', 'MacBook Air with M1 is an incredibly portable laptop — it’s nimble and quick, with a silent, fanless design and a beautiful Retina display. Thanks to its slim profile and all‑day battery life, this Air moves at the speed of lightness.', 'MTY3NzA4NDY1MDUyMS05OTAyNDAxODI=.jpg                            ', 1200, 3, '2023-02-22', 2);
INSERT INTO public.product (productid, name, description, image, price, created_by, created_at, categoryid) VALUES (16, 'Prestige Electric Kettle PKOSS - 1500watts, Steel (1.5Ltr)', 'Prepare hot water, Instant tea etc, in a matter of minutes with prestige Electric Kettle. With smart features like automatic cut-off, single touch lid locking, beautifully designed ergonomical handle, elegant body etc., this glamorously designed electric kettle is a must have accessory for your modern kitchen.', 'MTY3NzA4NDg1MTY2OC05NzAzMjIzMjc=.jpg                            ', 10, 3, '2023-02-22', 15);
INSERT INTO public.product (productid, name, description, image, price, created_by, created_at, categoryid) VALUES (17, ' Themisto TH-M98 Digital Multimeter (Black 2000 Counts)', '2000 count automatic digital multimeter, can measure the basic functions of Accurately measures DC Current, AC/DC Voltage, Duty Cycle, Resistance, Diode, Continuity, AC and DC switching and other button trigger work.

This Multimeter is a golden partner to help to troubleshoot a variety of automotive and household electrical problems safely and accurately. Double ceramic fuse is anti-burn and protects from overloading and it will be more secure and reliable； explosion-proof ceramic fuse tubes can protect the multimeter effectively.
', 'MTY3NzA4NTA1OTE2My0zODY0OTk2OTE=.jpg                            ', 8.5, 3, '2023-02-22', 16);
INSERT INTO public.product (productid, name, description, image, price, created_by, created_at, categoryid) VALUES (18, 'Green Soul Monster Ultimate Series T', 'MULTI-FUNCTIONAL CHAIR: Whether a gamer or a professional, no one likes being stuck in a rut in their profession when they can push the envelope and learn new things. Similarly, we at Green Soul couldn''t stop at Monster and Monster Pro and went above and beyond to bring you the Monster Series Ergonomic Chair Ultimate Edition. Monster Ultimate "T" brings you the ultimate in comfort and features.

BEST IN CLASS FABRIC: The Monster Ultimate chair has a breathable nylon-spandex fabric that permits airflow and provides cool and comfortable seating, better air circulation and reduced heat build-up, making it more breathable and pleasant than a leather chair.

TECH SPECIFICATIONS: Internal Frame Material: Metal ● Frame Size: Large ● Upholstery Material: Spandex Fabric + PU Leather ● Neck/Head Pillow: Yes (Velour Material) ● Lumbar Pillow: Yes (Made of Memory Foam & Upholstery - Velour Material) ● Foam Type: Seat made of Molded Foam ● Color: Black & Grey', 'MTY3NzA4NTMzMTcyOS03ODkyODAzMzE=.jpg                            ', 220, 3, '2023-02-22', 8);


--
-- TOC entry 3626 (class 0 OID 16501)
-- Dependencies: 221
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.review (reviewid, productid, userid, rating, title, review, created_at) VALUES (1, 7, 1, 4.5, 'Good Phone', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2023-02-22');
INSERT INTO public.review (reviewid, productid, userid, rating, title, review, created_at) VALUES (2, 7, 3, 5, 'Great experience and awesome performance', 'The iPhone 14 Pro is a game changer this is my 2nd iPhone purchase from amazon. The camera quality is incredible and the speed at which it operates is unmatched. The ProMotion technology makes scrolling and swiping feel smoother than ever. The battery life is also impressive and lasts me all day. Overall, I highly recommend this phone to anyone looking for a top-of-the-line device', '2023-02-22');
INSERT INTO public.review (reviewid, productid, userid, rating, title, review, created_at) VALUES (3, 7, 2, 3.5, 'Camera Quality', 'Apple knows how to grab the customers from other segments. The 14pro has video stabilisation which take care of all your videos whether you have made it in normal, cinematic or action mode. Once you have you will hardly req a gimble or go-pro. The only disadvantage is the space, these videos take lot of space and with 128, 256 you will be losing lot of space in quick time if you love to make videos.

Rest of things are absolute fine. If you have money then go for it without a second thought.', '2023-02-22');
INSERT INTO public.review (reviewid, productid, userid, rating, title, review, created_at) VALUES (4, 8, 2, 4.5, 'No more iphone', 'Switched to this from an iphone 12. So much more customizable and clean looking than the iphone. The speech to text is pretty bad, a lot of spelling and grammar errors. Also I''m also sad that HBO max doesnt allow picture-in-picture on samsungs. Other than that though, great camera and a lot more options on how you want your phone to look and run.', '2023-02-22');
INSERT INTO public.review (reviewid, productid, userid, rating, title, review, created_at) VALUES (5, 11, 2, 1, 'Best', 'BEST BISCUIT IN THE WORLD', '2023-02-22');
INSERT INTO public.review (reviewid, productid, userid, rating, title, review, created_at) VALUES (6, 10, 2, 5, 'Superb', 'Awesome quality. Worthable price. You can go to buy blindly.
LG tv gives long life their products.', '2023-02-22');
INSERT INTO public.review (reviewid, productid, userid, rating, title, review, created_at) VALUES (7, 14, 2, 3, 'Suitable for those who play Defensive', 'Racket got broken within a week after the purchase, while playing aggressive smashes and will be suitable for those who play more defensive approach.

Shock absorption is pretty low and even though its head heavy racket, felt that we need to apply more strength on the shuttle while hitting the smashes unlike the case with Astrox FB which I had used it earlier.

I do not recommend for those who are looking for better smashes better either switch to Voltric 25i lite or Apacs Z Ziggler( if you are ok with slightly heavier racket)', '2023-02-22');


--
-- TOC entry 3620 (class 0 OID 16425)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (userid, username, password, email, created_at) VALUES (1, 'mashaal', '$2a$10$N3k2SDFuVeeNP3m00LLD4O6zgq/6/tWCrFdxRdILjyFcm2UvnxE/a', 'mash@mail.com', '2023-02-20');
INSERT INTO public.users (userid, username, password, email, created_at) VALUES (2, 'Jefferson', '$2a$10$K5jXti7gv0LNMW0EC8ilMe1LfQr5PtmUVsRzbrbkRhoMkvB1Z3ljS', 'jeff@mail.com', '2023-02-22');
INSERT INTO public.users (userid, username, password, email, created_at) VALUES (3, 'TestMaster', '$2a$10$bbPmqbLcEDeE10oOF.ifRuL8wSch0PDC4incbE9WQvhzaoMwbNM5G', 'test@mail.com', '2023-02-22');


--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 216
-- Name: category_categoryid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_categoryid_seq', 19, true);


--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 218
-- Name: product_productid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_productid_seq', 18, true);


--
-- TOC entry 3638 (class 0 OID 0)
-- Dependencies: 220
-- Name: review_reviewid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.review_reviewid_seq', 7, true);


--
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_userid_seq', 3, true);


--
-- TOC entry 3468 (class 2606 OID 16444)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (categoryid);


--
-- TOC entry 3470 (class 2606 OID 16454)
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (productid);


--
-- TOC entry 3472 (class 2606 OID 16509)
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (reviewid);


--
-- TOC entry 3462 (class 2606 OID 16437)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3464 (class 2606 OID 16433)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 3466 (class 2606 OID 16435)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3473 (class 2606 OID 16495)
-- Name: product fk_product_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk_product_category FOREIGN KEY (categoryid) REFERENCES public.category(categoryid) ON DELETE SET NULL;


--
-- TOC entry 3474 (class 2606 OID 16455)
-- Name: product fk_product_created_by; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk_product_created_by FOREIGN KEY (created_by) REFERENCES public.users(userid) ON DELETE SET NULL;


--
-- TOC entry 3475 (class 2606 OID 16510)
-- Name: review fk_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fk_product_id FOREIGN KEY (productid) REFERENCES public.product(productid) ON DELETE CASCADE;


--
-- TOC entry 3476 (class 2606 OID 16515)
-- Name: review fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fk_user_id FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;


-- Completed on 2023-02-22 23:20:39 IST

--
-- PostgreSQL database dump complete
--

