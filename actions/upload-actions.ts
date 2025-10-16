"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";

export async function generatedPDFSummary(
  uploadResponse: Array<{
    url: string; // URL final dari UploadThing (utfs.io)
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

    return {
      success: true,
      message: "PDF parsed successfully",
      data: pdfText,
    };
  } catch (error) {
    return {
      success: false,
      message:
        "Error generating PDF summary: " +
        (error instanceof Error ? error.message : "Unknown error"),
      data: null,
    };
  }
}