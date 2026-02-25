import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CursorSpotlight from "../../components/CursorSpotlight";

export default function ServicePageShell({ title, subtitle, children, ctaLabel = "Get a quote" }) {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] text-white">
      <CursorSpotlight />
      <Navbar />
      <section className="mx-auto w-full max-w-4xl mt-28 px-4 sm:px-6 lg:px-8 pb-16">
        <Link href="/#services" className="text-sm text-slate-400 hover:text-white">
          ← Back to services
        </Link>
        <p className="text-sm text-slate-400 mt-5 mb-2">Service</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h1>
        <p className="text-slate-300 mb-8">{subtitle}</p>

        {children}

        <Link
          href="/#contact"
          className="inline-flex mt-2 px-5 py-3 rounded-lg bg-primary-500 text-white"
        >
          {ctaLabel}
        </Link>
      </section>
      <Footer />
    </main>
  );
}
