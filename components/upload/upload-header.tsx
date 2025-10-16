import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      {/* Animated Gradient Border */}
      <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-purple-300 via-fuchsia-500 to-purple-700 animate-gradient-x group">
        <Badge
          className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors"
        >
          <Sparkles className="h-5 w-5 mr-2 text-purple-600 animate-pulse inline-block" />
          <span>AI-Powered Content Creation</span>
        </Badge>
      </div>

      {/* Title */}
      <div className="capitalize text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
        Start Uploading{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2 text-purple-700">Your PDF’s</span>
          <span
            className="absolute inset-0 bg-purple-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          />
        </span>
      </div>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 max-w-2xl">
        Upload your PDF and let our AI do the magic! ✨
      </p>
    </div>
  );
}