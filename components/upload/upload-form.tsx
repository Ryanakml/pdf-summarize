"use client";

import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "@/components/upload/upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import { generatedPDFSummary } from "@/actions/upload-actions";

const schema = z.object({
  file: z
    .custom<File>((val) => val instanceof File, {
      message: "Please upload a valid file.",
    })
    .refine((file) => file.size <= 24 * 1024 * 1024, "File size must be less than 24MB.")
    .refine((file) => file.type === "application/pdf", "Please upload a PDF file."),
});

export default function UploadForm() {
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("File Uploaded successfully!");
    },
    onUploadError: () => {
      toast.error("Error occurred while uploading");
    },
    onUploadBegin: (fileName: string) => {
      toast.info("Upload has begun for " + fileName);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File | null;

    if (!file) {
      toast.error("No file selected.");
      return;
    }

    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      toast.error(validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file.");
      return;
    }

    // upload file into upload thing
    const resp = await startUpload([file]);
    if (!resp) {
      return;
    }

    // parse the pdf using langchain
    const summary = await generatedPDFSummary(resp);
    console.log({ summary });

    // summarize the pdf using ai
    // save result to database
    // return the id into user's dashboard
  }

  return (
    <div>
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}