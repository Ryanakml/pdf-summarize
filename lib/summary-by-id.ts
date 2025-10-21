"use server";

import { getDBConnection } from "./db";

export async function getSummaryById(id: string, clerkUserId: string) {
  try {
    const sql = await getDBConnection();

    // Ambil user UUID dari clerkUserId
    const userRows = await sql`
      SELECT id FROM users WHERE customer_id = ${clerkUserId} LIMIT 1
    `;
    if ((userRows as Array<{ id: string }>).length === 0) return null;
    const { id: userUuid } = (userRows as Array<{ id: string }>)[0];

    // Ambil summary + hitung jumlah kata langsung di SQL
    const rows = await sql`
      SELECT 
        id,
        user_id,
        title,
        original_file_url,
        summary,
        created_at,
        updated_at,
        status,
        file_name,
        LENGTH(summary) - LENGTH(REPLACE(summary, ' ', '')) + 1 AS word_count
      FROM pdf_summaries 
      WHERE id = ${id} AND user_id = ${userUuid}
      LIMIT 1
    `;

    return (rows as Array<any>)[0] ?? null;

  } catch (error) {
    console.error("Error fetching summary by ID:", error);
    return null;
  }
}