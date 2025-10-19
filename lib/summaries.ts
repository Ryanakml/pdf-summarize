"use server"

import { neon } from "@neondatabase/serverless";
import { getDBConnection } from "./db";

export async function getSummaries(
    userId: string) {
        const sql = await getDBConnection();
        const summaries = await sql`
            SELECT * FROM pdf_summaries
            WHERE user_id = ${userId}
        `;
        return summaries;

}