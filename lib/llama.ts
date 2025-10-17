import axios from "axios";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

export async function generateSummaryFromOllamaServer(pdfText: string) {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      // limit text for ensure server not timeout
      const limitedText = pdfText.slice(0, 4000);

      // prompt for ollama server to generate summary
      const prompt = `
      ${SUMMARY_SYSTEM_PROMPT}
      Transform this document into an engaging, easy-to-read summary 
      with contextually relevant emoji and proper markdown formatting.
      ${limitedText}
      `;
      
      // call api form my ollama server
      const response = await axios.post(
        "http://164.90.147.3:3001/summarize",
        { text: prompt },
        { timeout: 300000 } // 5 minutes, for cpu, cause it may take more time
      );

      const summary = response.data?.summary?.trim();
      if (!summary) throw new Error("No summary returned from Ollama");

      return summary;
    } catch (error: any) {
      attempt++;
      const delay = 2000 * attempt;
      console.warn(
        `Ollama server error (attempt ${attempt}/${maxRetries}): ${
          error.message || "Unknown error"
        }. Retrying in ${delay / 1000}s...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (attempt >= maxRetries) {
        console.error("Ollama Server Error:", error);
        throw new Error("FAILED_TO_SUMMARIZE_WITH_OLLAMA");
      }
    }
  }
}