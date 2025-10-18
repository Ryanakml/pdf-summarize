"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

type Stage = "idle" | "uploading" | "uploaded" | "generating";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onGenerate?: () => void;
  formRef?: React.RefObject<HTMLFormElement | null>;
  stage?: Stage;
}
export default function UploadFormInput({
  onSubmit,
  onGenerate,
  formRef,
  stage
}: UploadFormInputProps){
  const isUploading = stage === "uploading";
  const isGenerating = stage === "generating";
  const isUpload = stage == "uploaded"

    return (
    <form
      onSubmit={onSubmit}
      ref={formRef}
      className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl py-2.5 text-sm mx-auto"
    >
      <Input
        type="file"
        id="file"
        name="file"
        accept="application/pdf"
        disabled={isUploading || isGenerating} // lock input during upload/generation
        className="w-full sm:w-1/2 px-3 py-2 text-sm border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {stage == "idle" || stage == "uploading" ? (
        <Button 
          type="submit"
          disabled={isUploading}
          className="max-w-md flex items-center gap-2"
        >
          {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isUploading ? "Uploading ..." : "Upload PDF"}
        </Button>
      ) : (
        <Button
          type="submit"
          onClick={onGenerate}
          disabled={isGenerating}
          className="max-w-md flex items-center gap-2"
        >
          {isGenerating && <Loader2 className="h-4 w-4 animate-spin" />}
          {isGenerating ? "Generating Summary...." : "Generate Summary"}
        </Button>
      )}
    </form>
  );
}
