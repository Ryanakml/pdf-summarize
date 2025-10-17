"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOllamaServer } from "@/lib/llama";
import { auth } from "@clerk/nextjs/server";
import { getDBConnection } from "@/lib/db";
import { formatFileNameAsTitle } from "@/utils/format-utils";

interface PdfSummaryType {
  fileurl: string;
  summary: string;
  title: string;
  filename: string;
}

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

async function savePdfSummary({
  userId, 
  fileurl,
  summary,
  title,
  filename,
} : {
  userId: string, 
  fileurl: string,
  summary: string,
  title: string,
  filename: string,
}) {
  // sql inserting pdf summary
  try {
    const sql = await getDBConnection();
    await sql`
      INSERT INTO pdf_summaries (
      user_id, 
      file_url, 
      summary, 
      title, 
      filename
      ) VALUES (
       ${userId}, 
       ${fileurl}, 
       ${summary}, 
       ${title}, 
       ${filename}
       )`
  } catch (error) {
    console.error("Error in savePdfSummary:", error);
    throw error
  }
}

export async function storePdfSummaryAction({
  fileurl,
  summary,
  title,
  filename,
}: PdfSummaryType) {
  // user already logged in
  // save pdf summary

  let savedSummary: any;
  try{
    const { userId } = await auth()
     if (!userId) {
      return {
        success: false,
        message: "User not found",
        data: null,
      }
    }

    savedSummary = await savePdfSummary({
      userId, 
      fileurl,
      summary,
      title,
      filename,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Error saving PDF summary",
        data: null,
      }
    }

    const formattedFileName = formatFileNameAsTitle(filename);

    return {
      success: true,
      message: "PDF summary saved successfully",
      data: 
      title: fileName
      savedSummary, 

    }
  } catch (error) {
    return {
      success: false,
      message:
      error instanceof Error ? 
      error.message : "Unknown Saving PDF Summary",
      data: null,
    }
  }
}