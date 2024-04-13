## Rest API Testing API - Testing CRUD Operations with mongoDB database

# Create a .env file

PORT=3000  
DATABASE_URL=mongodb://localhost:27017/users

# Run mongodb container

docker run -d --name mongodb -p 27017:27017 mongo:latest

# Install project dependencies

npm install

# Start the dev server

npn run dev
