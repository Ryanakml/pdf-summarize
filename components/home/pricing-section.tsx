import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

type PricingCardProps = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  featured?: boolean;
};

function PricingCard({
  name,
  price,
  description,
  items,
  paymentLink,
  featured = false,
}: PricingCardProps) {
  return (
    <div
      className={`w-full max-w-sm sm:max-w-md rounded-3xl border p-8 flex flex-col justify-between mx-auto transition-all duration-500 hover:scale-[1.03] ${
        featured
          ? "border-fuchsia-400 shadow-[0_8px_40px_rgba(168,85,247,0.25)]"
          : "border-gray-200 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>

      {/* Price */}
      <div className="my-10">
        <p className="text-5xl font-extrabold text-slate-900">${price}</p>
        <p className="text-xs text-gray-500 uppercase tracking-wide">USD / month</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-10">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2 text-gray-700">
            <Check className="w-4 h-4 text-fuchsia-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <Link
        href={paymentLink}
        className={`w-full flex items-center justify-center gap-2 rounded-full py-3 text-base font-semibold transition-all duration-300 ${
          featured
            ? "bg-gradient-to-r from-fuchsia-500 to-purple-700 text-white hover:opacity-90"
            : "bg-gradient-to-r from-purple-100 to-fuchsia-100 text-fuchsia-700 hover:from-fuchsia-200 hover:to-purple-200"
        }`}
      >
        Buy Now
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: 9,
      description: "Perfect for occasional use",
      items: [
        "5 PDF summaries per month",
        "Standard processing speed",
        "Email support",
      ],
      id: "basic",
      paymentLink: "/#buy-basic",
    },
    {
      name: "Pro",
      price: 19,
      description: "For professionals and teams",
      items: [
        "Unlimited PDF summaries",
        "Priority processing",
        "24/7 priority support",
        "Markdown export",
      ],
      id: "pro",
      paymentLink: "/#buy-pro",
      featured: true,
    },
  ];

  return (
    <section
      id="pricing"
      className="relative mx-auto flex flex-col items-center justify-center py-24 lg:py-32 px-6 lg:px-16 max-w-7xl font-sans"
    >
      {/* Subheading */}
      <div className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-3">
        Pricing
      </div>

      {/* Title */}
      <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-14 max-w-3xl">
        Choose the plan that fits your needs
      </h2>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-10 w-full">
        {plans.map((plan) => (
          <PricingCard key={plan.id} {...plan} />
        ))}
      </div>
    </section>
  );
}