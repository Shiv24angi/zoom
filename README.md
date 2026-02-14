#Zoom - Video Conferencing Application - Connectify
A full-stack video conferencing web application designed for real-time communication. This project provides a professional interface for users to join and host video meetings with integrated authentication and meeting history features.

#Features
Real-Time Video Meetings: High-quality video and audio communication powered by Socket.io.

User Authentication: Secure user registration and login system.

Meeting History: Track and view past meeting logs.

Responsive Design: A modern, professional landing page and dashboard built with Material UI.

Secure Backend: Robust server-side logic using Node.js, Express, and MongoDB.

#Tech Stack
Frontend
React.js: Library for building the user interface.

Material UI & Emotion: For professional styling and icon components.

React Router: For seamless client-side navigation.

Socket.io-client: Real-time communication on the client side.

Axios: For making HTTP requests to the backend.

Backend
Node.js & Express: Server-side framework.

MongoDB & Mongoose: Database and object modeling for user and meeting data.

Socket.io: Enables real-time, bidirectional communication between web clients and the server.

Bcrypt: For secure password hashing.

Dotenv: Environment variable management.

#Installation and Setup
Prerequisites
Node.js (v16+ recommended)

MongoDB Atlas account or local MongoDB instance

Backend Setup
Navigate to the backend directory:

Bash
cd backend
Install dependencies:

Bash
npm install
Configure environment variables:

Create a .env file in the backend root.

Add your MongoDB URI: MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/.

Start the server:

Bash
npm run dev
Frontend Setup
Navigate to the frontend directory:

Bash
cd frontend
Install dependencies:

Bash
npm install
Start the React application:

Bash
npm start
📜 Available Scripts
Backend
npm run dev: Starts the server with nodemon for development.

npm start: Runs the server using standard node.

npm run prod: Runs the server using pm2 for production environments.

Frontend
npm start: Runs the app in development mode.

npm run build: Builds the app for production to the build folder.

Author: Shivangi
