import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./lib/db.js";
import UserRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

const app = express();
const server = http.createServer(app); // Create HTTP server

// Middleware setup
app.use(cors());
app.use(express.json({ limit: "4mb" }));

// Test API
app.use("/api/status", (req, res) => {
  res.send("Server is live and running");
});
app.use("/api", UserRouter);
app.use("/api/conversation-users", messageRouter);
connectDB();
// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
