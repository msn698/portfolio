import React from "react";

const faqs = [
  {
    q: "How long does a typical website project take?",
    a: "Most projects are completed in 5-14 days depending on scope and feedback speed.",
  },
  {
    q: "Do you help with content and structure?",
    a: "Yes. I help shape page structure, messaging flow, and conversion-focused sections.",
  },
  {
    q: "Can I request revisions?",
    a: "Absolutely. Revisions are included in every package to ensure the site matches your goals.",
  },
  {
    q: "What is the fastest way to start?",
    a: "Send your goals and timeline via WhatsApp or the contact form and I’ll reply with next steps.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-10" id="faq">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
        FAQ
      </h2>
      <div className="space-y-3 max-w-3xl mx-auto">
        {faqs.map((item) => (
          <details key={item.q} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <summary className="text-white font-medium cursor-pointer">{item.q}</summary>
            <p className="text-slate-300 text-sm mt-2">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
