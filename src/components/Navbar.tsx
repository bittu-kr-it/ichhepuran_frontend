"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-16">
        <Link
          href="/"
          className="font-display text-2xl font-semibold text-forest"
        >
          {settings.orgName}
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {settings.navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[15px] font-medium text-charcoal transition-colors hover:text-forest"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={settings.donateHref}
          className="hidden rounded-full bg-mustard px-6 py-2.5 text-sm font-semibold text-charcoal transition-transform hover:scale-[1.03] md:inline-block"
        >
          Donate Now
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="text-forest md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/5 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {settings.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-[15px] font-medium text-charcoal"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={settings.donateHref}
            className="mt-4 block rounded-full bg-mustard px-6 py-2.5 text-center text-sm font-semibold text-charcoal"
          >
            Donate Now
          </Link>
        </div>
      )}
    </header>
  );
}
