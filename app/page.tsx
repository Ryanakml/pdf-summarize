import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 sm:p-20">
      <section className="max-w-4xl text-center space-y-8">
        <div className="badge-glass mx-auto w-fit">
          <span>Powered by AI</span>
        </div>
        <h1 className="hero-title">Transform PDFs into concise summaries</h1>
        <p className="hero-subtitle max-w-2xl mx-auto">
          Get a beautiful summary reel of your document in seconds.
        </p>
        <div>
          <Button className="btn-gradient px-8 py-3 rounded-full text-base shadow-lg">Try Summarizer →</Button>
        </div>
      </section>
    </main>
  );
}