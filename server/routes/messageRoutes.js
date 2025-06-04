// routes/userRoutes.js
import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getConversationUsersWithMessages } from "../controller/MessageController.js";

const messageRouter = express.Router();

messageRouter.get(
  "/conversations/all",
  isAuthenticated,
  getConversationUsersWithMessages
);

export default messageRouter;
