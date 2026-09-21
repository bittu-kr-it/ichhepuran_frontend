import { FaBookOpen, FaPhone, FaWhatsapp } from "react-icons/fa6";
import type { SiteSettings } from "@/lib/types";
import FloatingLeafButton from "@/components/ui/FloatingLeafButton";
import GlassIconButton from "@/components/ui/GlassIconButton";

/**
 * Floating buttons over every page, bottom-right — admin toggled
 * independently in Site Settings → Floating Buttons. Each one renders only
 * when both its toggle is on AND its required data is set (a phone/WhatsApp
 * number, an uploaded e-book), same "don't render a dead link" discipline
 * as CorePillars' image-null guard.
 *
 * Two different visual styles, both intentional: Call/WhatsApp use
 * GlassIconButton (glowing glassmorphism — quick-contact actions, sit
 * above the e-book button), e-book keeps FloatingLeafButton (the
 * plant-pot hover effect) unchanged.
 */
export default function FloatingActions({ settings }: { settings: SiteSettings }) {
  const whatsappNumber = settings.whatsappEnabled ? settings.whatsappNumber?.replace(/[^0-9]/g, "") : "";
  const showWhatsapp = Boolean(whatsappNumber);

  const callNumber = settings.callEnabled ? settings.callNumber?.trim() : "";
  const showCall = Boolean(callNumber);

  const showEbook = Boolean(settings.ebookEnabled && settings.ebookUrl);

  if (!showWhatsapp && !showCall && !showEbook) return null;

  const waHref = showWhatsapp
    ? `https://wa.me/${whatsappNumber}${
        settings.whatsappMessage ? `?text=${encodeURIComponent(settings.whatsappMessage)}` : ""
      }`
    : undefined;

  const showContactGroup = showCall || showWhatsapp;

  return (
    <div className="fixed bottom-10 right-5 z-40 flex flex-col items-end gap-9 sm:right-6">
      {showContactGroup && (
        <div className="flex flex-col items-end gap-5">
          {showCall && (
            <GlassIconButton
              href={`tel:${callNumber!.replace(/[^0-9+]/g, "")}`}
              ariaLabel="Call us"
              icon={<FaPhone className="h-4 w-4" />}
              glowColor="rgba(233, 185, 73, 0.65)"
              size={42}
            />
          )}

          {showWhatsapp && (
            <GlassIconButton
              href={waHref!}
              ariaLabel="Chat on WhatsApp"
              icon={<FaWhatsapp className="h-5 w-5" />}
              glowColor="rgba(37, 211, 102, 0.65)"
              size={42}
            />
          )}
        </div>
      )}

      {showEbook && (
        <FloatingLeafButton
          href={settings.ebookUrl!}
          ariaLabel={settings.ebookLabel || "Download e-book"}
          label={settings.ebookLabel || "Download e-book"}
          icon={<FaBookOpen className="h-4 w-4 flex-none" />}
          className="bg-mustard text-charcoal"
        />
      )}
    </div>
  );
}
