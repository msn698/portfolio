import ServicePageShell from "../components/ServicePageShell";

export const metadata = {
  title: "Custom Website Package | Mohammed Saeed",
  description:
    "Custom package for advanced website features, integrations, and ongoing support tailored to your business.",
  alternates: {
    canonical: "/services/custom",
  },
};

export default function CustomServicePage() {
  return (
    <ServicePageShell
      title="Custom Package"
      subtitle="Need something unique? This package is scoped around your exact requirements."
      ctaLabel="Request Custom Scope"
    >
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-6">
        <h2 className="font-semibold mb-3">What you get</h2>
        <ul className="text-slate-300 text-sm space-y-2">
          <li>• Custom feature development</li>
          <li>• Third-party integrations</li>
          <li>• Automation and workflow enhancements</li>
          <li>• Ongoing improvement support</li>
          <li>• Priority communication</li>
        </ul>
      </div>
    </ServicePageShell>
  );
}
