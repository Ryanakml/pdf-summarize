import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
        const user = await currentUser();
        if(!user) throw new UploadThingError("User not found");
        return { userId: user.id }; 
    })
    .onUploadComplete(async ({ metadata, file }) => {
        console.log("Upload complete for userId:", metadata.userId);
        console.log("file url", file.url);
        return { userId: metadata.userId, file: file.url };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
