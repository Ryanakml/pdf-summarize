"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function UploadFormInput({onSubmit}: 
    UploadFormInputProps){
    return (
    <form
      onSubmit={onSubmit}
      className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl py-2.5 text-sm mx-auto"
    >
      <Input
        type="file"
        id="file"
        name="file"
        accept="application/pdf"
        className="w-full sm:w-1/2 px-3 py-2 text-sm border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <Button type="submit" className="max-w-md ">
        Upload
      </Button>
    </form>
  );
}
