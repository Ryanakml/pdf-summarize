"use server";

import { getDBConnection } from "./db";

export async function getSummaryById(id: string, clerkUserId: string) {
  const sql = getDBConnection();

  const userRows = await sql`
    SELECT id FROM users WHERE customer_id = ${clerkUserId} LIMIT 1
  `;
  if ((userRows as Array<{ id: string }>).length === 0) return null;
  const { id: userUuid } = (userRows as Array<{ id: string }>)[0];

  const rows = await sql`
    SELECT * FROM pdf_summaries WHERE id = ${id} AND user_id = ${userUuid} LIMIT 1
  `;
  return (rows as Array<any>)[0] ?? null;
}
