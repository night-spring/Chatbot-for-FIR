API_KEY="AIzaSyDBPNZCzzU1Y31OG7xQkE9jL4Ey2pJzpMw"
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Ensure you have your API key set in the environment variables
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "write a letter format";

// Wrap your code in an async function
async function generateStory() {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  } catch (error) {
    console.error('Error generating content:', error);
  }
}

// Call the async function
generateStory();
