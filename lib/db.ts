import { neon } from "@neondatabase/serverless";

export async function getDBConnection() {
    if (!process.env.NEON_DB_URL) {
        throw new Error("NEON_DB_URL is not set");
    }
    const sql = neon(process.env.NEON_DB_URL);
    return sql;
}