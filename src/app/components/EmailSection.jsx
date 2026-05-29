"use client";
import React, { useState } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const inputCls =
  "bg-white/[0.04] border border-white/10 placeholder-slate-500 text-gray-100 text-sm rounded-xl block w-full p-3 outline-none focus:border-primary-500/60 focus:ring-1 focus:ring-primary-500/30 transition-all duration-200";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting]     = useState(false);
  const [submitError, setSubmitError]       = useState("");
  const [startedAt]                         = useState(() => Date.now());
  const fallbackContactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const whatsappNumber       = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Saeed, I want to discuss a project.")}`
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);
    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
      website: e.target.website?.value || "",
      startedAt,
    };
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (payload?.code === "CONFIG_MISSING")
          throw new Error("Contact form is temporarily unavailable. Please use direct email below.");
        throw new Error(payload?.error || "Failed to send message");
      }
      setEmailSubmitted(true);
      e.target.reset();
    } catch (error) {
      setSubmitError(error?.message || "Could not send your message right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] opacity-10"
          style={{ background: "radial-gradient(circle, rgba(239,68,68,0.7) 0%, transparent 70%)" }} />
      </div>

      <div className="section-accent" />
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Let&apos;s Build Something</h2>
      <p className="text-slate-400 mb-8 max-w-md leading-relaxed">
        Have a project in mind? I&apos;m open to freelance work and collaborations.
        Prefer a quick reply? Message me on WhatsApp.
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left: info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-lift inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border border-[#25D366]/60 bg-[#25D366]/10 text-[#C8FAD9] text-sm font-semibold hover:bg-[#25D366]/20 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.522 5.847L.057 23.882l6.197-1.484A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.013-1.374l-.36-.213-3.681.882.935-3.576-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              Chat on WhatsApp
            </a>
          )}

          <div className="space-y-3 text-slate-300 text-sm">
            {[
              { icon: "⚡", text: "Typical reply within a few hours" },
              { icon: "📍", text: "Based in Dubai — open to remote" },
              { icon: "🤝", text: "Revisions included in every package" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <Link href="https://github.com/msn698/" target="_blank" rel="noopener noreferrer"
              className="hover-lift p-2 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-colors">
              <Image src={GithubIcon} alt="GitHub" width={24} height={24} />
            </Link>
            <Link href="https://www.linkedin.com/in/mohammed-saeed-nassar" target="_blank" rel="noopener noreferrer"
              className="hover-lift p-2 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-colors">
              <Image src={LinkedinIcon} alt="LinkedIn" width={24} height={24} />
            </Link>
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {emailSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8 text-center"
            >
              <div className="text-4xl mb-3">✅</div>
              <p className="text-green-400 font-semibold mb-1">Message sent!</p>
              <p className="text-slate-400 text-sm">I&apos;ll get back to you soon.</p>
            </motion.div>
          ) : (
            <form className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6" onSubmit={handleSubmit}>
              <input type="hidden" name="startedAt" value={startedAt} readOnly />
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input name="website" id="website" type="text" tabIndex="-1" autoComplete="off" />
              </div>

              <div>
                <label htmlFor="email" className="text-white block mb-1.5 text-sm font-medium">Your email</label>
                <input name="email" type="email" id="email" required className={inputCls} placeholder="you@company.com" />
              </div>
              <div>
                <label htmlFor="subject" className="text-white block text-sm mb-1.5 font-medium">Subject</label>
                <input name="subject" type="text" id="subject" required className={inputCls} placeholder="Need a website redesign" />
              </div>
              <div>
                <label htmlFor="message" className="text-white block text-sm mb-1.5 font-medium">Message</label>
                <textarea name="message" id="message" required rows={4} className={inputCls} placeholder="Share your goals, timeline, and budget range..." />
              </div>

              {submitError && (
                <div className="text-red-400 text-sm rounded-lg border border-red-500/20 bg-red-500/5 p-3" role="alert">
                  <p>{submitError}</p>
                  {fallbackContactEmail && (
                    <a href={`mailto:${fallbackContactEmail}`} className="underline text-red-300 mt-1 block">
                      Email directly: {fallbackContactEmail}
                    </a>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="hover-lift w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-5 rounded-xl transition-opacity flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message →"
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default EmailSection;
