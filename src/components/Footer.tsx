import Link from "next/link";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

// lucide-react dropped brand/logo icons (Facebook, Instagram, etc.) in
// recent versions, so every social link gets the same generic globe icon —
// the label is still shown via aria-label for screen readers.

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="relative bg-charcoal py-16 text-white/80">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-forest via-mustard to-sage" />

      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-xl font-semibold text-white">
              {settings.orgName}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              {settings.tagline}
            </p>

            {settings.socialLinks.length > 0 && (
              <div className="mt-6 flex gap-3">
                {settings.socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-mustard hover:text-charcoal"
                  >
                    <Globe className="h-4 w-4" strokeWidth={1.75} />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              {settings.navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-mustard">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Reach out</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 flex-none text-sage" strokeWidth={1.75} />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 flex-none text-sage" strokeWidth={1.75} />
                <span>{settings.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-sage" strokeWidth={1.75} />
                <span className="max-w-xs">{settings.address}</span>
              </li>
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
