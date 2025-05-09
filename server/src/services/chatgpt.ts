import OpenAI from "openai";
import dotenv from "dotenv";
import { ChatCompletionMessageParam } from "openai/resources";
dotenv.config();

const chatgpt = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// Function to get a response from ChatGPT
const getChatGPTResponse = async (
  messages: Array<ChatCompletionMessageParam>
): Promise<string | null> => {
  try {
    const response = await chatgpt.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling ChatGPT API:", error);
    throw new Error("Failed to get response from ChatGPT");
  }
};

export { getChatGPTResponse };
