"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitContactForm } from "@/lib/api";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import TextareaField from "@/components/ui/TextareaField";

const schema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().min(1, "Please enter your email").email("Enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(1, "Please enter a message"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      await submitContactForm(values);
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-charcoal/5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Name" {...register("name")} error={errors.name?.message} />
          <TextField label="Email" type="email" {...register("email")} error={errors.email?.message} />
        </div>
        <TextField label="Subject (optional)" {...register("subject")} />
        <TextareaField label="Message" {...register("message")} error={errors.message?.message} />

        {status === "success" && (
          <p className="text-sm font-medium text-forest">
            Thank you — your message has been received. We'll get back to you soon.
          </p>
        )}
        {status === "error" && errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

        <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? "Sending…" : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
