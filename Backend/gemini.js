const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const geminiRouter = express.Router(); // Use Router
geminiRouter.use(cors());
geminiRouter.use(express.json());

// API Key for Google Generative AI
const API_KEY = "AIzaSyDBPNZCzzU1Y31OG7xQkE9jL4Ey2pJzpMw";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define /generate route inside geminiRouter
geminiRouter.post('/generate', async (req, res) => {
  const { query } = req.body;
  try {
    const result = await model.generateContent(query);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error('Error generating content:', error.message || error); // Log the error message
    res.status(500).json({ error: 'Failed to generate response', details: error.message });
  }
});

module.exports = geminiRouter; // Export the router
