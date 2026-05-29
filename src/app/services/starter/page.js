import ServicePageShell from "../components/ServicePageShell";

export const metadata = {
  title: "Starter Website Package | Mohammed Saeed",
  description:
    "Starter package for modern one-page business websites with WhatsApp/contact integration and SEO basics.",
  alternates: {
    canonical: "/services/starter",
  },
};

export default function StarterServicePage() {
  return (
    <ServicePageShell
      title="Starter Package"
      subtitle="Perfect for businesses that need a clean, modern web presence quickly."
      ctaLabel="Start Starter Package"
    >
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-6">
        <h2 className="font-semibold mb-3">What you get</h2>
        <ul className="text-slate-300 text-sm space-y-2">
          <li>• 1-page modern website</li>
          <li>• Mobile-first responsive design</li>
          <li>• WhatsApp + contact form integration</li>
          <li>• Basic on-page SEO setup</li>
          <li>• Delivery in 5-7 days</li>
        </ul>
      </div>
    </ServicePageShell>
  );
}
