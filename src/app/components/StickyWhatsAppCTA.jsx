"use client";

import React from "react";

const StickyWhatsAppCTA = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const href = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Saeed, I want to discuss a project.")}`
    : null;

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 md:hidden px-4 py-3 rounded-full bg-[#25D366] text-[#0b1f12] font-semibold shadow-lg"
    >
      WhatsApp
    </a>
  );
};

export default StickyWhatsAppCTA;
