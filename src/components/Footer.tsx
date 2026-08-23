import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-charcoal py-16 text-white/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-xl font-semibold text-white">
              {settings.orgName}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              {settings.tagline}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              {settings.navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-mustard">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Reach out</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>{settings.phone}</li>
              <li>{settings.email}</li>
              <li className="max-w-xs">{settings.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} {settings.orgName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
