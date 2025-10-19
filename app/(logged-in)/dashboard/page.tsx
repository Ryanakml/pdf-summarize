import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SummaryCard } from "@/components/summaries/summary-card";

export default function DashboardPage() {
    const uploadLimit = 5;
    const summaries = [
        {
            id: 1,
            title: "Summary 1",
            description: "This is a summary of the first PDF.",
            created_at: "2023-10-01",
            summary_text: "This is a summary of the first PDF.",
            status: "completed",
        },
    ]
    return (
    <main className="min-h-screen">
        <div className="container mx-auto flex flex-col gap-8 px-4 py-12 sm:py-24">
          <div className="px-2 py-12 sm:py-24">
            {/* Left Section */}
            <div className="flex gap-4 mb-8 justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-linear-to-r
                 from-purple-600 via-fuchsia-600 to-purple-800 bg-clip-text text-transparent">
                  Your Summaries
                </h1>
                <p className="text-gray-700 max-w-xl text-base sm:text-lg">
                  Transform your PDFs into concise, actionable insights instantly.
                </p>
              </div>

              {/* Right Section */}
              <Button
                variant={"link"}
                className="px-3 py-1.5 text-sm bg-linear-to-r from-purple-500 via-fuchsia-500 to-fuchsia-600
                hover:from-purple-600 hover:via-fuchsia-600 hover:to-purple-700 
                hover:scale-105 transition-all duration-300 text-white font-medium shadow-md hover:shadow-lg 
                group hover:no-underline"
              >
                <Link href="/upload" className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                  New Summary
                </Link>
              </Button> 
            </div>
            <div className="mb-6">
                <div className="bg-fuchsia-50 border border-fuchsia-300 text-fuchsia-800 px-4 py-3 rounded-lg">
                    <p className="text-sm">
                        you reach the limit of 5 summaries per day.
                        {' '}<Link 
                        href="/pricing" 
                        className="text-fuchsia-800 underline font-medium underline-offset-4 inline-flex items-center"
                        >
                        upgrade to pro{' '}
                        </Link>
                        {' '}to get unlimited uploads
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
                {summaries.map((summary, index) => (
                    <SummaryCard key={index} summary={summary} />
                ))}
            </div>
          </div>
        </div>
    </main>
  );
}