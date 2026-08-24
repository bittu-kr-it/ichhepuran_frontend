import type { DonationMethod, GetInvolvedHeroContent } from "../types";

// Mirrors backend/database/seeders/GetInvolvedPageSeeder.php's real content.

export const getInvolvedHeroMock: GetInvolvedHeroContent = {
  headline: "Your Contribution Sows the Seeds of Change",
  subheading:
    "Whether you choose to donate financially, volunteer your time, or partner with us through CSR, every effort helps us restore nature and empower communities.",
};

export const donationMethodsMock: DonationMethod[] = [
  {
    id: "1",
    type: "bank",
    title: "Bank Transfer",
    fields: {
      "Account Name": "Ichhe Puran Trust",
      Bank: "National Green Bank",
      "A/C No.": "987654321012",
      IFSC: "NGRB0001234",
      Branch: "Eco Park, Kolkata",
    },
    instructions: "All donations are tax-deductible under Section 80G.",
    order: 1,
  },
  {
    id: "2",
    type: "upi",
    title: "UPI",
    fields: { "UPI ID": "ichhepuran@upi" },
    instructions:
      "Scan the QR code (once uploaded in the admin panel) or pay directly to the UPI ID above. All donations are tax-deductible under Section 80G.",
    order: 2,
  },
  {
    id: "3",
    type: "international",
    title: "International Donors",
    fields: {},
    instructions:
      "For supporters outside India, we accept wire transfers and PayPal. Please email donations@ichhepuran.org for FCRA details.",
    order: 3,
  },
];
