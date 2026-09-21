import {
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTelegram,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

// lucide-react (this project's general icon library, see frontend/CLAUDE.md)
// dropped all brand/logo icons, so social links use this separate small
// brand-icon set (react-icons/fa6) instead, looked up by the `icon` string
// the admin picks in Site Settings → Social & Donate (a curated Select,
// SiteSetting::SOCIAL_ICON_OPTIONS on the backend — keep both in sync).
// `Website`/unknown/missing icon falls back to a generic globe, same
// "never crash on an unrecognised icon string" rule as the lucide lookups.
const socialIcons: Record<string, IconType> = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
  Twitter: FaXTwitter,
  YouTube: FaYoutube,
  WhatsApp: FaWhatsapp,
  Telegram: FaTelegram,
  Pinterest: FaPinterestP,
  Website: FaGlobe,
};

export default function SocialIcon({ icon, className }: { icon?: string; className?: string }) {
  const Icon = (icon && socialIcons[icon]) || FaGlobe;
  return <Icon className={className} />;
}
