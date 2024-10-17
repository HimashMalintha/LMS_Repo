import GroupMessage from "../models/GroupMessage.js";


// Get all messages
export const getAllGroupMessages = async (req, res) => {
    try {
        const { chatRoomId } = req.query;

        if (!chatRoomId) {
            return res.status(400).json({ message: 'chatRoomId is required' });
        }

        const messages = await GroupMessage.find({ chatRoomId });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new group message
export const createGroupMessage = async (req, res) => {
    const { chatRoomId, message, sender } = req.body;
  
    const newMessage = new GroupMessage({
      chatRoomId,
      message,
      sender
    });
  
    try {
      const savedMessage = await newMessage.save();
      res.status(201).json(savedMessage);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };