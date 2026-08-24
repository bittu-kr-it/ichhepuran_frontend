import type { LegalPage, LegalPageSummary } from "../types";

// Mirrors LegalPagesSeeder.php's 3 real pages so local dev without a
// backend still has representative content — see that seeder's docblock
// for the "drafted, not legal advice, review before go-live" caveat.
export const legalPagesSummaryMock: LegalPageSummary[] = [
  { title: "Privacy Policy", slug: "privacy-policy" },
  { title: "Terms & Conditions", slug: "terms-and-conditions" },
  { title: "Refund & Cancellation Policy", slug: "refund-and-cancellation-policy" },
];

export const legalPagesMock: LegalPage[] = [
  {
    id: "privacy-policy",
    slug: "privacy-policy",
    title: "Privacy Policy",
    updatedAt: "2026-08-24",
    body: `<p>Ichhe Puran ("we", "us", "our", operating as Ichhe Puran Trust) respects your privacy and is committed to protecting the personal information you share with us through this website.</p>
<h2>Information We Collect</h2>
<p>We collect information you provide directly, such as your name, email address, phone number, and postal address, when you make a donation, apply to volunteer, submit a CSR partnership inquiry, subscribe to our newsletter, or contact us through the website.</p>
<h2>Payment Information</h2>
<p>Online donations are processed through Razorpay. We do not store your card, UPI, or net-banking credentials on our servers.</p>
<h2>Contact Us</h2>
<p>For any privacy-related questions, please contact us at info@ichhepuran.org.</p>`,
  },
  {
    id: "terms-and-conditions",
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    updatedAt: "2026-08-24",
    body: `<p>These Terms & Conditions govern your use of the Ichhe Puran website, operated by Ichhe Puran Trust. By using this Site, you agree to these terms.</p>
<h2>Donations</h2>
<p>All donations made through this Site are voluntary contributions in support of our charitable activities, processed securely through Razorpay.</p>
<h2>Governing Law</h2>
<p>These terms are governed by the laws of India, and any disputes shall be subject to the jurisdiction of the courts in Kolkata, West Bengal.</p>
<h2>Contact Us</h2>
<p>Questions about these terms can be sent to info@ichhepuran.org.</p>`,
  },
  {
    id: "refund-and-cancellation-policy",
    slug: "refund-and-cancellation-policy",
    title: "Refund & Cancellation Policy",
    updatedAt: "2026-08-24",
    body: `<p>Donations made to Ichhe Puran Trust are voluntary contributions and are, as a general rule, non-refundable once processed.</p>
<h2>Exceptions</h2>
<p>We will review and process a refund for a duplicate charge, an incorrect amount charged due to a verified error, or a failed transaction where funds were debited but no donation was recorded.</p>
<h2>How to Request a Refund</h2>
<p>Contact us at info@ichhepuran.org within 7 days of the transaction, including your name, amount, date, and payment reference.</p>`,
  },
];
