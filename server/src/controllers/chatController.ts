import { Request, Response } from 'express';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const MODEL_NAME = "gemini-1.5-flash-latest"; // Or another suitable model

// @desc    Handle chat requests
// @route   POST /api/chat
// @access  Private
export const generateChatResponse = async (req: Request, res: Response) => {
  try {
    const { prompt, systemPrompt, history } = req.body;

    // --- Validation ---
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required." });
    }
    if (!systemPrompt) {
        return res.status(400).json({ message: "System prompt is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "API key not configured." });
    }

    // --- Initialize AI Model ---
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
        model: MODEL_NAME,
        // The system instruction tells the model how to behave
        systemInstruction: systemPrompt,
    });

    // --- Safety Settings ---
    // These are important to prevent harmful content. Adjust as needed.
    const safetySettings = [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    // --- Start Chat Session ---
    // The history allows the AI to remember the context of the conversation.
    const chat = model.startChat({
        safetySettings,
        history: history || [], // Use provided history or start fresh
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    
    // --- Send Response ---
    res.status(200).json({
      message: {
        role: 'model',
        parts: [{ text: response.text() }]
      }
    });

  } catch (error: any) {
    console.error("Error in Gemini Chat:", error);
    // Check for specific safety-related errors
    if (error.message && error.message.includes('SAFETY')) {
        return res.status(400).json({ message: "The response was blocked due to safety concerns. Please rephrase your message." });
    }
    res.status(500).json({ message: "An error occurred while communicating with the AI." });
  }
};