const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

require('dotenv').config();

// Sahi initialization format (direct API key string)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `You are a helpful AI Assistant for a Hospital Management System. User query: ${message}`;
        
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        res.json({ reply: responseText });
    } catch (error) {
        console.error("Gemini Route Error Details:", error);
        res.status(500).json({ error: error.message || "AI response generate nahi kar paya." });
    }
});

module.exports = router;