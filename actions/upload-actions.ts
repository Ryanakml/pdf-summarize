"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOllamaServer } from "@/lib/llama";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getDBConnection } from "@/lib/db";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { ensurePdfSummariesSchema } from "@/lib/db_migrations";

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

    let summary: string | undefined;
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

    const title = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "PDF summary generated successfully",
      data: {
        summary,
        fileurl: pdfUrl,
        title,
        filename: fileName,
      },
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

async function ensureUserAndGetId() {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  const fullName = user?.fullName ?? null;

  if (!email) throw new Error("User email not found");

  const sql = await getDBConnection();

  // Try to find existing user by email
  const existingRes = await sql`
    SELECT id FROM users WHERE email = ${email} LIMIT 1
  `;
  const existing = existingRes as Array<{ id: string }>;
  if (existing.length > 0) {
    return existing[0].id;
  }

  // Create if not exists. Store Clerk userId in customer_id for traceability.
  const createdRes = await sql`
    INSERT INTO users (email, full_name, customer_id, status)
    VALUES (${email}, ${fullName}, ${userId}, 'active')
    RETURNING id
  `;
  const created = createdRes as Array<{ id: string }>;
  return created[0].id;
}

async function savePdfSummary({
  userUuid,
  fileurl,
  summary,
  title,
  filename,
}: {
  userUuid: string;
  fileurl: string;
  summary: string;
  title: string;
  filename: string;
}) {
  try {
    const sql = await getDBConnection();
    // Ensure schema matches our expectations
    await ensurePdfSummariesSchema();
    const insertedRes = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        status,
        title,
        file_name,
        summary
      ) VALUES (
        ${userUuid},
        ${fileurl},
        'completed',
        ${title},
        ${filename},
        ${summary}
      )
      RETURNING id
    `;
    const inserted = insertedRes as Array<{ id: string }>;
    return inserted[0];
  } catch (error) {
    console.error("Error in savePdfSummary:", error);
    throw error;
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
    const userUuid = await ensureUserAndGetId();

    savedSummary = await savePdfSummary({
      userUuid,
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

    return {
      success: true,
      message: "PDF summary saved successfully",
      data: {
        id: savedSummary.id,
        title,
        fileurl,
      }, 

    }
  } catch (error) {
    return {
      success: false,
      message:
      error instanceof Error ? 
      error.message : "Error Saving PDF Summary",
      data: null,
    }
  }
}