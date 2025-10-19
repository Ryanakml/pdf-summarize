"use server"

import { getDBConnection } from "./db";

// Fetch summaries for the signed-in Clerk user by mapping their Clerk userId to our internal users.id (UUID)
export async function getSummaries(clerkUserId: string) {
    const sql = await getDBConnection();

    // Find the internal user UUID for this Clerk user
    const userRows = await sql`
        SELECT id FROM users WHERE customer_id = ${clerkUserId} LIMIT 1
    `;
    if ((userRows as Array<{ id: string }>).length === 0) {
        return [];
    }
    const { id: userUuid } = (userRows as Array<{ id: string }>)[0];

    const summaries = await sql`
        SELECT * FROM pdf_summaries
        WHERE user_id = ${userUuid}
        ORDER BY created_at DESC
    `;
    return summaries as Array<any>;
}