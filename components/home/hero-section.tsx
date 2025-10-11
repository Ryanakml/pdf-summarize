import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-6 sm:px-20">
      <div className="max-w-3xl text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400 bg-purple-50/40 text-purple-600 text-sm font-medium mx-auto">
          <Sparkles className="h-4 w-4" />
          <span>Powered by AI</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          xxx xxx{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-purple-700">xxx</span>
            <span className="absolute inset-x-0 bottom-1 h-3 bg-purple-100 rounded-md -z-10"></span>
          </span>{" "}
          xxx
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          xxxx
        </p>

        {/* Button */}
        <div>
          <Button
            className="bg-gradient-to-r from-black via-purple-500 to-purple-700 hover:from-purple-700 hover:to-purple-600 text-white px-8 py-5 rounded-full text-base font-semibold shadow-lg transition-all duration-300"
          >
            Try Summarizer →
          </Button>
        </div>
      </div>
    </section>
  )
}