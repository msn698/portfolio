"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard({ email }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.refresh();
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-white text-xl font-semibold mb-1">Admin</h1>
          <p className="text-slate-400 text-sm">
            Signed in as <span className="text-slate-200">{email}</span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors disabled:opacity-60"
        >
          {loggingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-[#181818] p-5">
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Session</p>
          <p className="text-white text-sm">Active — expires after 2 hours</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#181818] p-5">
          <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Site</p>
          <a
            href="/"
            className="text-white text-sm underline underline-offset-4 hover:text-slate-300"
          >
            View public site
          </a>
        </div>
      </div>

      <p className="text-slate-500 text-xs mt-8">
        This area is server-gated. Add admin tools here as needed.
      </p>
    </div>
  );
}
