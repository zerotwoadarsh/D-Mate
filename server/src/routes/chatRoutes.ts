import express from 'express';
import { generateChatResponse } from '../controllers/chatController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// This route is protected. A user must be logged in to chat.
router.post('/', protect, generateChatResponse);

export default router;