"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitVolunteerApplication } from "@/lib/api";
import Button from "@/components/ui/Button";
import SelectField from "@/components/ui/SelectField";
import TextField from "@/components/ui/TextField";
import TextareaField from "@/components/ui/TextareaField";

const AREA_OPTIONS = [
  { value: "reforestation", label: "Reforestation Projects" },
  { value: "waste_management", label: "Waste Management" },
  { value: "community_education", label: "Community Education" },
  { value: "administrative_support", label: "Administrative Support" },
];

const schema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().min(1, "Please enter your email").email("Enter a valid email"),
  countryCode: z.string().min(1, "Required"),
  phone: z.string().min(1, "Please enter your phone number"),
  areaOfInterest: z.enum([
    "reforestation",
    "waste_management",
    "community_education",
    "administrative_support",
  ] as const, { message: "Please choose an area of interest" }),
  message: z.string().min(1, "Tell us why you'd like to join"),
});

type FormValues = z.infer<typeof schema>;

export default function VolunteerForm() {
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
      await submitVolunteerApplication(values);
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
          <TextField label="Full name" {...register("name")} error={errors.name?.message} />
          <TextField label="Email" type="email" {...register("email")} error={errors.email?.message} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <TextField label="Country code" {...register("countryCode")} error={errors.countryCode?.message} />
          <div className="col-span-2">
            <TextField label="Contact number" {...register("phone")} error={errors.phone?.message} />
          </div>
        </div>
        <SelectField
          label="Area of interest"
          options={AREA_OPTIONS}
          placeholder="Choose one"
          {...register("areaOfInterest")}
          error={errors.areaOfInterest?.message}
        />
        <TextareaField
          label="Why do you want to join Ichhe Puran?"
          {...register("message")}
          error={errors.message?.message}
        />

        {status === "success" && (
          <p className="text-sm font-medium text-forest">
            Thank you — your application has been received. We'll be in touch soon.
          </p>
        )}
        {status === "error" && errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

        <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? "Submitting…" : "Submit Application"}
        </Button>
      </form>
    </div>
  );
}
