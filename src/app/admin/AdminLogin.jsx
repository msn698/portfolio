"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        router.refresh();
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8"
    >
      <h1 className="text-white text-xl font-semibold mb-1">Sign in</h1>
      <p className="text-slate-400 text-sm mb-6">Restricted area.</p>

      <label className="block text-slate-300 text-sm mb-1.5" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        autoComplete="username"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 rounded-lg border border-white/10 bg-[#181818] px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
      />

      <label className="block text-slate-300 text-sm mb-1.5" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-5 rounded-lg border border-white/10 bg-[#181818] px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
      />

      {error && (
        <p className="text-red-400 text-sm mb-4" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-white text-black font-medium py-2.5 text-sm hover:bg-slate-200 transition-colors disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
