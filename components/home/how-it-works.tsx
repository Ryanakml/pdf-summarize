import { FileUp, Brain, FileDown } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FileUp className="w-10 h-10 text-fuchsia-600" />,
      title: "Upload PDF",
      desc: "Simply drag and drop your PDF document or click to upload.",
    },
    {
      icon: <Brain className="w-10 h-10 text-fuchsia-600" />,
      title: "AI Analysis ✨",
      desc: "Our advanced AI processes and analyzes your document instantly.",
    },
    {
      icon: <FileDown className="w-10 h-10 text-fuchsia-600" />,
      title: "Get Summary",
      desc: "Receive a clear, concise summary of your document.",
    },
  ];

  return (
    <section className="relative mx-auto flex flex-col items-center justify-center py-20 lg:py-28 px-6 lg:px-12 max-w-7xl font-sans">
      {/* Subheading */}
      <div className="text-sm font-bold text-fuchsia-600 uppercase tracking-wider mb-2 py-5">
        How it works
      </div>

      {/* Title */}
      <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-800 max-w-2xl leading-relaxed mb-10">
        Transform any PDF into an easy-to-digest summary <br className="hidden sm:block" /> 
        in three simple steps
        </h2>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mt-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-100 to-fuchsia-50 shadow-sm">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
            <p className="text-gray-600 text-sm max-w-xs">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}