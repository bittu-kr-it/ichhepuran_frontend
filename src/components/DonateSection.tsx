"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Script from "next/script";
import { createDonationOrder, verifyDonation } from "@/lib/api";
import type { RazorpayCheckoutResponse } from "@/lib/razorpay";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";

const AMOUNT_PRESETS = [500, 1000, 2500, 5000];

const donateSchema = z.object({
  donorName: z.string().min(1, "Please enter your name"),
  donorEmail: z.string().min(1, "Please enter your email").email("Enter a valid email"),
  donorPhone: z.string().optional(),
});

type DonateFormValues = z.infer<typeof donateSchema>;

type Status = "idle" | "processing" | "success" | "error";

export default function DonateSection() {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonateFormValues>({ resolver: zodResolver(donateSchema) });

  const amount = customAmount ? Number(customAmount) : selectedAmount;

  async function onSubmit(values: DonateFormValues) {
    if (!amount || amount < 1) {
      setStatus("error");
      setErrorMessage("Please choose or enter a donation amount.");
      return;
    }

    setStatus("processing");
    setErrorMessage(null);

    try {
      const order = await createDonationOrder({ ...values, amount });

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Ichhe Puran",
        description: "Donation",
        prefill: {
          name: values.donorName,
          email: values.donorEmail,
          contact: values.donorPhone,
        },
        theme: { color: "#1F5D42" },
        handler: async (response: RazorpayCheckoutResponse) => {
          try {
            await verifyDonation({
              donationId: order.donationId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            setStatus("success");
          } catch (err) {
            setStatus("error");
            setErrorMessage(err instanceof Error ? err.message : "Payment verification failed.");
          }
        },
        modal: {
          ondismiss: () => setStatus("idle"),
        },
      });

      razorpay.open();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-charcoal/5">
        <p className="font-display text-2xl font-semibold text-forest">Thank you for your donation!</p>
        <p className="mt-2 text-charcoal-soft">Your generosity helps us restore ecosystems and empower communities.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-charcoal/5">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <p className="text-sm font-semibold text-charcoal">Choose an amount</p>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {AMOUNT_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setSelectedAmount(preset);
              setCustomAmount("");
            }}
            className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
              !customAmount && selectedAmount === preset
                ? "bg-forest text-white"
                : "bg-pale-green text-charcoal hover:bg-sage/40"
            }`}
          >
            ₹{preset.toLocaleString("en-IN")}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <TextField
          label="Or enter a custom amount (₹)"
          type="number"
          min={1}
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          placeholder="e.g. 1500"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <TextField label="Full name" {...register("donorName")} error={errors.donorName?.message} />
        <TextField label="Email" type="email" {...register("donorEmail")} error={errors.donorEmail?.message} />
        <TextField label="Phone (optional)" type="tel" {...register("donorPhone")} />

        {status === "error" && errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}

        <Button type="submit" disabled={status === "processing"} className="w-full">
          {status === "processing" ? "Starting payment…" : `Donate ₹${amount ? amount.toLocaleString("en-IN") : ""}`}
        </Button>
      </form>
    </div>
  );
}
