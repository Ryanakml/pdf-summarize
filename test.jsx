import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      {/* Badge */}
      <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-purple-300 via-purple-500 to-purple-800 animate-gradient-x group">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">Powered by AI</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="font-bold py-6 text-center text-4xl sm:text-5xl lg:text-6xl text-slate-900">
        Transform PDFs into{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2 text-purple-600">concise</span>
          <span
            className="absolute inset-0 bg-purple-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>{" "}
        summaries
      </h1>

      {/* Subtitle */}
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of your document in seconds.
      </h2>

      {/* Button */}
      <Button
        variant="link"
        className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-gradient-to-r from-purple-700 to-fuchsia-500 hover:from-fuchsia-500 hover:to-purple-700 font-bold shadow-lg transition-all duration-300"
      >
        <Link href="/#pricing" className="flex gap-2 items-center">
          <span>Try Sommaire</span>
          <ArrowRight className="animate-pulse" />
        </Link>
      </Button>
    </section>
  );
}