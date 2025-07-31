// gemini-api.js
// Utility for calling Google Gemini API

const GEMINI_API_KEY = "AIzaSyDSydW9D4YdvFgGw9YV0OGlOTuTKWzV31k";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;

/**
 * Calls the Gemini API to generate text based on a prompt
 * @param {string} prompt - The prompt to send to Gemini
 * @returns {Promise<string>} - The generated text
 */
export async function generateGeminiText(prompt) {
  const body = {
    contents: [
      { parts: [{ text: prompt }] }
    ]
  };
  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error("Gemini API error: " + response.status);
  }
  const data = await response.json();
  // Extract the generated text from the response
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}
