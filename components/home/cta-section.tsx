"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function CTASection() {
  const { isSignedIn } = useUser(); // ⬅️ status user login

  return (
    <section className="relative mx-auto flex flex-col items-center justify-center py-20 lg:py-28 px-6 lg:px-12 max-w-7xl font-sans">
      {/* Subheading */}
      <div className="text-sm font-bold text-fuchsia-600 uppercase tracking-wider mb-2 py-5">
        Get started today
      </div>

      {/* Title */}
      <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-800 max-w-2xl leading-relaxed mb-10">
        {isSignedIn
          ? "You're all set! Start summarizing your PDFs now."
          : "Ready to transform your PDFs? Sign up now and start summarizing!"}
      </h2>

      {/* CTA Button */}
      <div className="flex justify-center">
        {isSignedIn ? (
          <Link
            href="/dashboard"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-fuchsia-500 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Go to Dashboard →
          </Link>
        ) : (
          <Link
            href="/sign-up"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-fuchsia-500 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Sign Up Free
          </Link>
        )}
      </div>
    </section>
  );
}