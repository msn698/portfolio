import ServicePageShell from "../components/ServicePageShell";

export const metadata = {
  title: "Growth Website Package | Mohammed Saeed",
  description:
    "Growth package for businesses that need multi-section websites, stronger conversion flow, and analytics-ready setup.",
  alternates: {
    canonical: "/services/growth",
  },
};

export default function GrowthServicePage() {
  return (
    <ServicePageShell
      title="Growth Package"
      subtitle="For brands ready to move beyond a basic website and convert more leads."
      ctaLabel="Start Growth Package"
    >
      <div className="rounded-xl border border-primary-500/40 bg-white/[0.03] p-5 mb-6">
        <h2 className="font-semibold mb-3">What you get</h2>
        <ul className="text-slate-300 text-sm space-y-2">
          <li>• Multi-section business website</li>
          <li>• Conversion-focused UX + copy structure</li>
          <li>• Speed/performance optimization</li>
          <li>• Analytics and lead tracking setup</li>
          <li>• Delivery in 7-14 days</li>
        </ul>
      </div>
    </ServicePageShell>
  );
}
