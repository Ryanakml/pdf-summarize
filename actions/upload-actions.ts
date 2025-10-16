"use service";

import { fetchAndExtractPdfText } from "@/lib/langchain";

export async function generatedPDFSummary(
    uploadResponse: [{
        serverData: {
            userId: string;
            file: {
                url: string;
                name: string;
            };
        };
    }
]
) {
    if (!uploadResponse) {
        return {
            success: false,
            message: "No upload response provided",
            data: null,
        };
    }

    const {
        serverData: {
            userId,
            file: { 
                url: pdfUrl, 
                name: fileName,
             },
            },
    } = uploadResponse[0];

    if (!pdfUrl) {
        return {
            success: false,
            message: "No PDF URL found in the upload response",
            data: null,
        };
    }

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log({ pdfText });
    } catch (error) {
        return {
            success: false,
            message: "Error generating PDF summary: " + (error instanceof Error ? error.message : "Unknown error"),
            data: null,
        };
    }
}