import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import { connectToSocket } from "./controllers/socketManager.js";

const app = express();
const server = createServer(app);
connectToSocket(server);

// Middlewares
app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Routes
app.use("/api/v1/users", userRoutes);

// Start server + DB
const start = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB connected: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`🚀 Server running on port ${app.get("port")}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server", error);
    process.exit(1);
  }
};

start();
