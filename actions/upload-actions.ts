"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOllamaServer } from "@/lib/openai";

export async function generatedPDFSummary(
  uploadResponse: Array<{
    url: string;
    name: string;
    key: string;
  }>
) {
  if (!uploadResponse || !uploadResponse[0]?.url) {
    return {
      success: false,
      message: "No valid PDF URL found in upload response",
      data: null,
    };
  }

  const pdfUrl = uploadResponse[0].url;
  const fileName = uploadResponse[0].name;

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log({ fileName, pdfText: pdfText.slice(0, 300) + "..." });

    let summary;
    try {
      summary = await generateSummaryFromOllamaServer(pdfText);
      console.log({ summary });
    } catch (error) {
      console.error("Error generating summary from Ollama:", error);
    }

    if (!summary) {
      return {
        success: false,
        message: "Error generating PDF summary from Ollama",
        data: null,
      };
    }

    return {
      success: true,
      message: "PDF summary generated successfully",
      data: summary,
    };
  } catch (error: any) {
    console.error("Error in generatedPDFSummary:", error);
    return {
      success: false,
      message:
        "Error generating PDF summary: " +
        (error instanceof Error ? error.message : "Unknown error"),
      data: null,
    };
  }
}