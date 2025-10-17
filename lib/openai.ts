import axios from "axios";

export async function generateSummaryFromOllamaServer(pdfText: string) {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      // Batasi teks agar efisien
      const limitedText = pdfText.slice(0, 8000);

      // Panggil API server pribadi kamu (Ollama)
      const response = await axios.post(
        "http://164.90.147.3:3001/summarize",
        { text: limitedText },
        { timeout: 120000 } // 120 detik, Ollama di CPU kadang agak lama
      );

      const summary = response.data?.summary;
      if (!summary) throw new Error("No summary returned from Ollama");

      return summary;
    } catch (error: any) {
      attempt++;
      const delay = 2000 * attempt;
      console.warn(
        `⚠️ Ollama server error (attempt ${attempt}/${maxRetries}): ${
          error.message || "Unknown error"
        }. Retrying in ${delay / 1000}s...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (attempt >= maxRetries) {
        console.error("❌ Ollama Server Error:", error);
        throw new Error("FAILED_TO_SUMMARIZE_WITH_OLLAMA");
      }
    }
  }
}