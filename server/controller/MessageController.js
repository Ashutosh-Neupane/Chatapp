// controllers/messageController.js
import Message from "../models/Message.js";
import User from "../models/User.js";

export const getConversationUsersWithMessages = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Find all messages involving the user
    const allMessages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    })
      .sort({ createdAt: 1 }) // optional: sort by oldest to newest
      .populate("sender receiver", "-password");

    // 2. Group messages by the other user
    const conversationMap = new Map();

    for (const msg of allMessages) {
      const otherUser =
        msg.sender._id.toString() === userId.toString()
          ? msg.receiver
          : msg.sender;

      const key = otherUser._id.toString();

      if (!conversationMap.has(key)) {
        conversationMap.set(key, {
          user: otherUser,
          messages: []
        });
      }

      conversationMap.get(key).messages.push(msg);
    }

    const conversations = Array.from(conversationMap.values());

    return res.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
