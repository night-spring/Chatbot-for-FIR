const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 3001; // Ensure this port matches with the one used in the frontend fetch request

app.use(cors()); // Enable CORS
app.use(express.json()); // To handle JSON body requests

// API Key for Google Generative AI
const API_KEY = "AIzaSyDBPNZCzzU1Y31OG7xQkE9jL4Ey2pJzpMw";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define /api/generate route
app.post('/api/generate', async (req, res) => {
  const { query } = req.body; // Get the 'query' from the request body
  try {
    const result = await model.generateContent(query);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
