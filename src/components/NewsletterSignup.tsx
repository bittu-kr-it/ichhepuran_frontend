"use client";

import { useState, type FormEvent } from "react";
import { subscribeToNewsletter } from "@/lib/api";

// A single-field form doesn't need the full react-hook-form/zod machinery
// the other forms use — plain useState is enough here.
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await subscribeToNewsletter({ email });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="mt-6 text-sm font-medium text-mustard">You&rsquo;re subscribed — thank you!</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-6">
      <p className="text-sm font-semibold text-white">Subscribe to our newsletter</p>
      <div className="mt-2 flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          // Browser extensions (password managers, form-fillers) inject
          // attributes like `fdprocessedid` into inputs before React
          // hydrates, which React otherwise flags as a hydration mismatch —
          // see https://react.dev/link/hydration-mismatch. Not something
          // this app renders or controls. This field renders on every
          // page (site-wide Footer), so it's the one most likely to hit it.
          suppressHydrationWarning
          className="w-full rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-mustard"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          suppressHydrationWarning
          className="flex-none rounded-full bg-mustard px-4 py-2 text-sm font-semibold text-charcoal transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-50"
        >
          {status === "submitting" ? "…" : "Join"}
        </button>
      </div>
      {status === "error" && <p className="mt-2 text-xs text-red-400">Something went wrong. Please try again.</p>}
    </form>
  );
}
