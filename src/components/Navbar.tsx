"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf, Menu, X } from "lucide-react";
import type { SiteSettings } from "@/lib/types";
import Button from "@/components/ui/Button";

// "/" only matches the home page exactly; every other link matches its own
// path and any sub-path under it (e.g. "/initiatives/tree-plantation").
function isActiveLink(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest/10">
            <Leaf className="h-5 w-5 text-forest" strokeWidth={2} />
          </span>
          <span className="font-display text-2xl font-semibold text-forest">
            {settings.orgName}
          </span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {settings.navLinks.map((link) => {
            const active = isActiveLink(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative text-[15px] font-medium transition-colors hover:text-forest ${
                    active ? "text-forest" : "text-charcoal"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-mustard transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <Button
          href={settings.donateHref}
          size="sm"
          className="hidden md:inline-block"
        >
          Donate Now
        </Button>

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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-black/5 md:hidden"
          >
            <div className="px-6 py-4">
              <ul className="flex flex-col gap-4">
                {settings.navLinks.map((link) => {
                  const active = isActiveLink(pathname, link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`block text-[15px] font-medium ${
                          active ? "text-forest" : "text-charcoal"
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Button href={settings.donateHref} size="sm" className="mt-4 block">
                Donate Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
