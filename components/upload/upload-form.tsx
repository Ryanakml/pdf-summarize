"use client";

import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "@/components/upload/upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import { generatedPDFSummary } from "@/actions/upload-actions";
import { storePdfSummaryAction } from "@/actions/upload-actions";
import { useRef } from "react";
import { useState } from "react";

type Stage = "idle" | "uploading" | "uploaded" | "generating";

const schema = z.object({
  file: z
    .custom<File>((val) => val instanceof File, {
      message: "Please upload a valid file.",
    })
    .refine((file) => file.size <= 24 * 1024 * 1024, "File size must be less than 24MB.")
    .refine((file) => file.type === "application/pdf", "Please upload a PDF file."),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [uploadResp, setUploadResp] = useState<
    Array<{ url: string
      name: string
      key: string
    }> | null >(null);

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

  // Uploading state
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStage("uploading");

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File | null;

    const parsed = schema.safeParse({ file });
    if (!parsed.success) {
      toast.error(parsed.error.flatten().fieldErrors.file?.[0] ?? "Invalid file.");
      setStage("idle");
      return;
    }

    try {
      // upload file into upload thing
      const resp = await startUpload([file as File]);
      if (!resp) {
        toast.error("Failed to upload file, please try again.");
        setStage("idle");
        return;
      }

      // upload done, waiting for user feedback to click "Summary"
      setUploadResp(resp);
      setStage("uploaded");
    } catch (error) {
      console.error("Error during upload or summary:", error);
      toast.error("An unexpected error occurred.");
      setStage("idle");
    }
  }

    // parse the pdf using langchain
    const handleGenerate = async () => {
    if (!uploadResp) {
      toast.error("No upload response found. Please upload a PDF first.");
      return;
    }
    setStage("generating");

    try {
      const result = await generatedPDFSummary(uploadResp);
      if (result?.success && result?.data?.summary) {
        toast.success("Summary created and saved successfully!", {
          description: "Your PDF summary has been generated.",
        });
        
        await storePdfSummaryAction({
          summary: result.data.summary,
          fileurl: result.data.fileurl,
          title: result.data.title,
          filename: result.data.filename,
        });

        formRef.current?.reset();
        setUploadResp(null);
        setStage("idle");
      } else {
        toast.error("Failed to generate summary, please try again.");
        setStage("uploaded"); // allow retrying generation
      }
    } catch (error) {
      console.error("Error during upload or summary:", error);
      toast.error("An unexpected error occurred.");
      setStage("uploaded"); // allow retrying generation
    }

    // summarize the pdf using ai
    // save result to database
    // return the id into user's dashboard
  };
      
  return ( 
    <div>
      <UploadFormInput 
      onSubmit={handleSubmit} 
      onGenerate={handleGenerate}
      formRef={formRef}
      stage={stage}
    />
  </div>
);
}