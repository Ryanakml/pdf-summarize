import { getDBConnection } from "@/lib/db";

// Ensures pdf_summaries has correct columns: original_file_url, file_name, summary
export async function ensurePdfSummariesSchema() {
  const sql = await getDBConnection();

  const rows = await sql`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'pdf_summaries'
  `;
  const columns = new Set((rows as Array<{ column_name: string }>).map(r => r.column_name));

  // Rename legacy columns if present
  if (!columns.has("original_file_url") && columns.has("file_url")) {
    await sql`ALTER TABLE pdf_summaries RENAME COLUMN file_url TO original_file_url`;
    columns.add("original_file_url");
    columns.delete("file_url");
  }

  if (!columns.has("file_name") && columns.has("filename")) {
    await sql`ALTER TABLE pdf_summaries RENAME COLUMN filename TO file_name`;
    columns.add("file_name");
    columns.delete("filename");
  }

  // Add summary column if missing
  if (!columns.has("summary")) {
    await sql`ALTER TABLE pdf_summaries ADD COLUMN summary TEXT`;
  }
}
