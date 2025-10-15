import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ClientLayout from "./client-layout"; 
import { Toaster, toast } from "sonner";

const fontSans = FontSans({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AI Summarizer",
  description: "Summarize your PDF documents with the power of AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#a855f7",
          fontFamily: "var(--font-source-sans)",
        },
        elements: {
          card: "shadow-2xl backdrop-blur-xl border border-purple-100 rounded-3xl",
          formButtonPrimary:
            "bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-fuchsia-500 hover:to-purple-700 text-white font-semibold",
        },
      }}
    >
      <html lang="en">
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <Toaster position="top-right" richColors />
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}