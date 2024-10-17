import express from "express";
import {
    getAllGroupMessages,
    createGroupMessage
} from "../controllers/groupMessageController.js";

const router = express.Router();

// Get all group messages
router.get('/', getAllGroupMessages);

// Create a new group message
router.post('/', createGroupMessage);

export default router;
