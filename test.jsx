"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react"; // ✅ pakai FileText sebagai logo
import { Button } from "@/components/ui/button";

const slides = [
  {
    title: "Quick Overview",
    text: "Comprehensive Next.js 15 course covering everything from fundamentals to advanced deployment strategies.",
    icon: "💡",
  },
  {
    title: "Core Concepts",
    text: "Learn about routing, data fetching, and server components to build lightning-fast web apps.",
    icon: "⚡",
  },
  {
    title: "Deployment Insights",
    text: "Discover how to deploy Next.js apps seamlessly to platforms like Vercel and AWS.",
    icon: "🚀",
  },
];

export default function DemoSection() {
  const [index, setIndex] = useState(0);

  const prevSlide = () => setIndex((index - 1 + slides.length) % slides.length);
  const nextSlide = () => setIndex((index + 1) % slides.length);

  return (
    <section className="relative mx-auto flex flex-col items-center justify-center py-20 lg:pb-28 transition-all animate-in px-6 lg:px-12 max-w-7xl font-sans">
      {/* Logo */}
      <div className="mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 shadow-md">
          <FileText className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 max-w-3xl leading-snug">
        Watch how{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">
          Sommaire
        </span>{" "}
        transforms{" "}
        <span className="text-fuchsia-600 font-semibold">this Next.js course PDF</span>{" "}
        into an easy-to-read summary!
      </h2>

      {/* Demo Card */}
      <div className="relative mt-12 w-full max-w-3xl rounded-3xl border border-purple-100 bg-white/90 shadow-[0_4px_40px_rgba(168,85,247,0.15)] backdrop-blur-xl overflow-hidden">
        {/* Header progress */}
        <div
          className="h-1 bg-gradient-to-r from-purple-500 to-fuchsia-400 transition-all duration-500"
          style={{ width: `${((index + 1) / slides.length) * 100}%` }}
        />

        {/* Content */}
        <div className="p-8 text-center transition-all duration-500">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {slides[index].title}
          </h3>
          <div className="mx-auto max-w-md text-gray-700 bg-purple-50/60 rounded-xl px-5 py-4 flex items-start gap-3">
            <span className="text-fuchsia-600 mt-0.5">{slides[index].icon}</span>
            <p>{slides[index].text}</p>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-purple-100">
          {/* Left button */}
          <button
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">

            {slides.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition ${
                  i === index ? "bg-fuchsia-500" : "bg-purple-200"
                }`}
              ></div>
            ))}
          </div>

          {/* Right button */}
          <Button
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-fuchsia-500 text-white hover:bg-fuchsia-600 transition-all duration-300"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}