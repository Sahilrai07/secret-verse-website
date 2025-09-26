"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// ✅ Validation Schema
const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    console.log("Forgot password request:", data);
    setSubmitted(true);

    // 👉 Later: integrate API to send reset email
    toast.success("If the email exists, a reset link has been sent.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Header */}
      <CardHeader className="text-center space-y-2 pb-6">
        <CardTitle className="text-3xl md:text-4xl font-playfair text-yellow-400">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-gray-300">
          Enter your email to receive a password reset link
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-6">
        {submitted ? (
          <p className="text-green-400 text-center font-medium">
            ✅ If that email is registered, you’ll receive a reset link shortly.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={`text-sm ${
                  errors.email ? "text-red-400" : "text-gray-300"
                }`}
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                aria-invalid={!!errors.email}
                className={`bg-black/40 text-white border ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500 rounded-full py-3 font-semibold shadow-lg shadow-yellow-500/40 transition-all duration-300"
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        )}

        {/* Bottom Links */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Remember your password?{" "}
          <a
            href="/auth/login"
            className="text-yellow-400 hover:underline font-medium"
          >
            Back to Login
          </a>
        </p>

        {/* Bottom Text */}
        <p className="text-center text-xs text-gray-500 mt-8">
          By requesting a reset, you agree to our{" "}
          <a href="/terms" className="text-yellow-400 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-yellow-400 hover:underline">
            Privacy Policy
          </a>
          . <br />© {new Date().getFullYear()} Secret Verse. All rights
          reserved.
        </p>
      </CardContent>
    </motion.div>
  );
}
