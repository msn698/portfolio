import Link from "next/link";

export const metadata = {
  title: "Restaurant Website Design in Dubai | Mohammed Saeed",
  description:
    "Conversion-focused restaurant website design in Dubai with menu pages, WhatsApp ordering, and mobile-first UX.",
  alternates: {
    canonical: "/services/restaurant-website-dubai",
  },
};

export default function RestaurantWebsiteDubaiPage() {
  return (
    <main className="mx-auto w-full max-w-4xl mt-28 px-4 sm:px-6 lg:px-8 pb-16 text-white">
      <p className="text-sm text-slate-400 mb-3">Service</p>
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        Restaurant Website Design in Dubai
      </h1>
      <p className="text-slate-300 mb-8">
        Get a clean, mobile-first restaurant website built to convert visitors
        into WhatsApp chats and real customers.
      </p>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mb-8">
        <h2 className="font-semibold mb-3">What you get</h2>
        <ul className="text-slate-300 text-sm space-y-2">
          <li>• Modern homepage with clear call-to-actions</li>
          <li>• Menu section with clean structure</li>
          <li>• WhatsApp order/contact integration</li>
          <li>• Speed + SEO basics setup</li>
        </ul>
      </div>

      <Link
        href="/#contact"
        className="inline-flex px-5 py-3 rounded-lg bg-primary-500 text-white"
      >
        Get a quote
      </Link>
    </main>
  );
}
