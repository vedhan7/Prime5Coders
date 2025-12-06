
import { GoogleGenAI } from "@google/genai";

// ---------------------------------------------------------
// CRITICAL: Replace this with your actual Gemini API Key
// Get one at https://aistudio.google.com/app/apikey
// ---------------------------------------------------------
const GEMINI_API_KEY = "INSERT_YOUR_GEMINI_API_KEY_HERE"; 

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const generateBotResponse = async (
  message: string, 
  history: { role: string; parts: { text: string }[] }[],
  contextData: string
) => {
  try {
    // If key is missing, return a friendly error
    if (GEMINI_API_KEY === "INSERT_YOUR_GEMINI_API_KEY_HERE") {
        return "I'm currently being configured. Please tell the developer to add their Gemini API Key in services/ai.ts!";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `You are 'PrimeBot', the intelligent AI assistant for Prime5Coders, a premium web development agency.
        
        Your Tone: Professional, friendly, confident, and concise.
        Your Goal: Help potential clients understand our services, pricing, and encourage them to start a project or contact us.

        Here is the data about our agency. Use this to answer questions:
        ${contextData}

        Rules:
        1. Only answer questions related to web development, our agency, or our services.
        2. If asked about pricing, recommend the "Professional" plan as it offers the best value.
        3. If you don't know the answer, ask them to contact vedhanmail@gmail.com.
        4. Keep responses short (under 3 sentences) unless asked for details.
        `,
      },
    });

    return response.text || "I'm having trouble connecting right now. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};
