import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <div className="from-purple-200 via-fuchsia-200 to-indigo-200">
        <div className="container mx-auto flex flex-col gap-4">
          <div className="px-2 py-12 sm:py-24">
            <div className="flex gap-4 mb-8 justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-purple-600 to-indigo-800 bg-clip-text text-transparent">
                  Your Summaries
                </h1>
                <p className="text-gray-700 max-w-xl">
                  Transform your PDFs into concise, actionable insights instantly.
                </p>
              </div>

              <Button
                variant={"link"}
                className="bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hover:scale-105 transition-all duration-300 group hover:no-underline"
              >
                <Link href="/upload" className="flex items-center text-white">
                  <Plus className="w-5 h-5 mr-2" />
                  New Summary
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}