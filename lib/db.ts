import { neon } from "@neondatabase/serverless";

// Returns a cached Neon SQL helper. Uses NEON_DB_URL if present, otherwise DATABASE_URL.
export function getDBConnection() {
    const url = process.env.NEON_DB_URL ?? process.env.DATABASE_URL;
    if (!url) throw new Error("NEON_DB_URL or DATABASE_URL is not set");

    const g = global as any;
    if (!g.__neonSql) {
        g.__neonSql = neon(url);
    }
    return g.__neonSql as ReturnType<typeof neon>;
}