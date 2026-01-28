
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  // Use the GoogleGenAI client according to @google/genai guidelines
  private ai: GoogleGenAI;

  constructor() {
    // Initialize using a named parameter and direct access to process.env.API_KEY
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async askTechnicalAdvisor(prompt: string): Promise<string> {
    try {
      // Use ai.models.generateContent to query GenAI with both model and prompt as required
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: `You are the HexaCore Dynamics Technical Advisor. 
          You provide sophisticated, expert-level information about the 'Walking Cargo Transporter'. 
          The transporter features: 6 multi-articulated legs, 15-ton payload capacity, autonomous terrain mapping, and hybrid power. 
          Respond in a professional, slightly visionary, and helpful tone. 
          Keep answers concise and luxurious in feel.`,
          temperature: 0.7,
        },
      });
      
      // Access the .text property directly from the GenerateContentResponse object
      return response.text || "I'm currently recalibrating my processing units. Please try again shortly.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I apologize, but I encountered a transmission error. Please ensure your technical link is secure.";
    }
  }
}

export const geminiService = new GeminiService();
