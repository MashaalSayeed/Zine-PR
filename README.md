# Zine Product Review

Made from PostgreSQl, Express, React and Node.js

## Setup

To setup the database

1. Install PostgreSQL and pgAdmin4
2. Run `psql -u postgres` and enter your password to connect to local database server
3. Go to `server/db` and run the file using `psql -u postgres -f db.sql` or Run `data.sql` for sample data

To setup the server

1. Go to `server` directory
2. Install all dependencies using `npm i`
3. Store database credentials in a `.env`, see `.env.example`
4. Create a folder `uploads` inside the server directory
5. Start the server using `npm start`

To setup the client server

1. Go to `client` directory
2. Install all dependencies using `npm i`
3. Start client using `npm start`
