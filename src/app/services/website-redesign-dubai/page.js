import Link from "next/link";

export const metadata = {
  title: "Website Redesign in Dubai | Mohammed Saeed",
  description:
    "Professional website redesign in Dubai focused on modern UI, better speed, and stronger lead conversion.",
  alternates: {
    canonical: "/services/website-redesign-dubai",
  },
};

export default function WebsiteRedesignDubaiPage() {
  return (
    <main className="mx-auto w-full max-w-4xl mt-28 px-4 sm:px-6 lg:px-8 pb-16 text-white">
      <p className="text-sm text-slate-400 mb-3">Service</p>
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        Website Redesign in Dubai
      </h1>
      <p className="text-slate-300 mb-8">
        Upgrade outdated websites into modern, high-converting pages with clear
        messaging, better UX, and performance improvements.
      </p>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-8">
        <h2 className="font-semibold mb-3">Redesign focus areas</h2>
        <ul className="text-slate-300 text-sm space-y-2">
          <li>• UI refresh and visual hierarchy</li>
          <li>• Clear CTA and lead-flow optimization</li>
          <li>• Mobile responsiveness and speed cleanup</li>
          <li>• SEO metadata and page structure improvements</li>
        </ul>
      </div>

      <Link
        href="/#contact"
        className="inline-flex px-5 py-3 rounded-lg bg-primary-500 text-white"
      >
        Start redesign
      </Link>
    </main>
  );
}
