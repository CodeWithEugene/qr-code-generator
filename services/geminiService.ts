import { GoogleGenAI } from "@google/genai";

// Fix: Per @google/genai guidelines, initialize with process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const model = 'gemini-2.5-flash';

const systemInstruction = `You are an intelligent assistant for a QR code generator application. 
Your primary task is to interpret a user's natural language request and convert it into the precise, raw string format required for generating a specific type of QR code. 
You must ONLY output the final data string. Do not include any explanations, labels, or extra text.

Here are the formats you must follow:
- For a URL: "https://example.com"
- For plain text: "This is a simple text."
- For a Wi-Fi network: "WIFI:T:WPA;S:NetworkName;P:Password;;" (Replace NetworkName and Password. T can be WPA, WEP, or nopass).
- For an email: "mailto:user@example.com?subject=Subject&body=Body Text"
- For an SMS: "smsto:+1234567890:Message text"
- For a phone number: "tel:+1234567890"

Example User Prompts and Your Expected Outputs:
- User: "my website google.com" -> Output: "https://google.com"
- User: "wifi for my cafe 'The Daily Grind' password is 'coffee!23'" -> Output: "WIFI:T:WPA;S:The Daily Grind;P:coffee!23;;"
- User: "send an email to contact@business.com" -> Output: "mailto:contact@business.com"
- User: "just the text hello world" -> Output: "hello world"

Now, process the user's request.`;


export const getAiSuggestion = async (prompt: string): Promise<string> => {
  // Fix: Check for API key inside the function and throw if not present.
  if (!process.env.API_KEY) {
    throw new Error("API_KEY for Gemini is not configured.");
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const text = response.text.trim();
    if (!text) {
      throw new Error("AI returned an empty response.");
    }
    
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate content from AI.");
  }
};
