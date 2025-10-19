'use server'

import { getDBConnection } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function deleteSummary(
    { summaryId 
    }: { summaryId: string }
){
    try{ 
                const user = await currentUser()
                const clerkUserId = user?.id

                if (!clerkUserId){
            throw new Error("User Not Found")
        }
                const sql = await getDBConnection()

                // Get internal user UUID
                const userRows = await sql`
                    SELECT id FROM users WHERE customer_id = ${clerkUserId} LIMIT 1
                `;
                const mapped = userRows as Array<{ id: string }>;
                if (mapped.length === 0) {
                    return { success: false };
                }
                const userUuid = mapped[0].id;

                // delete from db (correct table pdf_summaries)
                const result = await sql`
                        DELETE FROM pdf_summaries
                        WHERE id = ${summaryId}
                        AND user_id = ${userUuid}
                        RETURNING id
                `

                const rows = Array.isArray(result) ? result : (result as any).rows

        if (rows && rows.length > 0){
            revalidatePath('/dashboard')
            return { success: true }
        }
        return {success: false}

        // relevate from path

    } catch (error) {
        console.error("Error deleting summary:", error)
        return {success: false}
    }
}