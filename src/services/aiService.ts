import { GoogleGenerativeAI } from "@google/generative-ai";

// Temporary: Hardcoded API key for testing
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY ;

//console.log("DEBUG: API_KEY loaded:", API_KEY ? "YES" : "NO");

const genAI = new GoogleGenerativeAI(API_KEY);

export interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: string;
}

export const generateQuiz = async (topic: string): Promise<Question[]> => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Generate 5 multiple-choice questions about "${topic}". 
  Return the response ONLY as a valid JSON array of objects. 
  Each object should have:
  - "id": number (1-5)
  - "text": string (the question)
  - "options": array of 4 strings
  - "correctAnswer": string (must be one of the options)
  
  Do not include markdown formatting like \`\`\`json. Just the raw JSON array.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown formatting if Gemini adds it despite instructions
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Error generating quiz:", error);
        throw new Error("Failed to generate quiz. Please try again.");
    }
};

export const generateFeedback = async (score: number, topic: string): Promise<string> => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `A user just took a quiz on "${topic}" and scored ${score}/5. 
  Write a short, encouraging, and witty feedback message for them (max 2 sentences).`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating feedback:", error);
        return `You scored ${score}/5 on ${topic}. Good job!`;
    }
};
