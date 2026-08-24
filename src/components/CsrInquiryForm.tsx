"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitCsrInquiry } from "@/lib/api";
import Button from "@/components/ui/Button";
import SelectField from "@/components/ui/SelectField";
import TextField from "@/components/ui/TextField";
import TextareaField from "@/components/ui/TextareaField";

const BUDGET_OPTIONS = [
  { value: "5l_10l", label: "₹5L – ₹10L" },
  { value: "10l_50l", label: "₹10L – ₹50L" },
  { value: "50l_plus", label: "₹50L+" },
];

const schema = z.object({
  organizationName: z.string().min(1, "Please enter your organization name"),
  contactPerson: z.string().min(1, "Please enter a contact person"),
  email: z.string().min(1, "Please enter a work email").email("Enter a valid email"),
  countryCode: z.string().min(1, "Required"),
  phone: z.string().min(1, "Please enter a phone number"),
  budgetRange: z.enum(["5l_10l", "10l_50l", "50l_plus"] as const, {
    message: "Please choose a budget range",
  }),
  goals: z.string().min(1, "Tell us about your partnership goals"),
});

type FormValues = z.infer<typeof schema>;

export default function CsrInquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { countryCode: "+91" } });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      await submitCsrInquiry(values);
      setStatus("success");
      reset({ countryCode: "+91" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-charcoal/5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Organization name"
            {...register("organizationName")}
            error={errors.organizationName?.message}
          />
          <TextField label="Contact person" {...register("contactPerson")} error={errors.contactPerson?.message} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Work email" type="email" {...register("email")} error={errors.email?.message} />
          <div className="grid grid-cols-3 gap-4">
            <TextField label="Code" {...register("countryCode")} error={errors.countryCode?.message} />
            <div className="col-span-2">
              <TextField label="Contact number" {...register("phone")} error={errors.phone?.message} />
            </div>
          </div>
        </div>
        <SelectField
          label="Budget range"
          options={BUDGET_OPTIONS}
          placeholder="Choose a range"
          {...register("budgetRange")}
          error={errors.budgetRange?.message}
        />
        <TextareaField label="Partnership goals" {...register("goals")} error={errors.goals?.message} />

        {status === "success" && (
          <p className="text-sm font-medium text-forest">
            Thank you — your inquiry has been received. Our partnerships team will reach out soon.
          </p>
        )}
        {status === "error" && errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

        <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? "Submitting…" : "Submit Inquiry"}
        </Button>
      </form>
    </div>
  );
}
