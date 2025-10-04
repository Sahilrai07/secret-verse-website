"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { Eye, EyeOff } from "lucide-react";
import { VendorLoginSchema } from "@/schema"; // <-- separate schema for vendors

type VendorLoginFormValues = z.infer<typeof VendorLoginSchema>;

export default function VendorLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<VendorLoginFormValues>({
    resolver: zodResolver(VendorLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: VendorLoginFormValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/vendor/dashboard",
    });

    if (result?.error) {
      setError("password", {
        type: "server",
        message: "Invalid email or password",
      });
      toast.error("Vendor login failed. Please check your credentials.");
      return;
    }
    toast.success("Welcome Vendor! Redirecting to your dashboard...");
    window.location.href = "/vendor/dashboard";
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
          Vendor Login
        </CardTitle>
        <CardDescription className="text-gray-300">
          Sign in to manage your vendor account
        </CardDescription>
      </CardHeader>

      {/* Form */}
      <CardContent className="space-y-6">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-describedby="vendor-login-errors"
        >
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300 text-sm">
              Vendor Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="vendor@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "vendor-email-error" : undefined}
              className="bg-black/40 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
            />
            {errors.email && (
              <p id="vendor-email-error" className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2 relative">
            <Label
              htmlFor="password"
              className={`text-sm ${
                errors.password ? "text-red-400" : "text-gray-300"
              }`}
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                aria-invalid={!!errors.password}
                className={`bg-black/40 text-white pr-10 border ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a
              href="/vendor/forgot-password"
              className="text-sm text-yellow-400 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-500 rounded-full py-3 font-semibold shadow-lg shadow-yellow-500/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login as Vendor"}
          </Button>
        </form>

        {/* Divider */}
        {/* <div className="relative flex items-center justify-center my-4">
          <div className="absolute w-full h-px bg-gray-700"></div>
          <span className="relative bg-gray-900/40 px-3 text-gray-400 text-sm">
            OR
          </span>
        </div> */}

        {/* Google Button */}
        {/* <Button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/vendor/dashboard" })}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-gray-600 text-gray-200 hover:text-white bg-black/40 hover:bg-gray-800 rounded-full py-3 transition-all duration-300"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </Button> */}

        {/* Register Link */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Not a vendor yet?{" "}
          <a
            href="/vendor/register"
            className="text-yellow-400 hover:underline font-medium"
          >
            Register your business
          </a>
        </p>

        {/* Bottom Text */}
        <p className="text-center text-xs text-gray-500 mt-8">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-yellow-400 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-yellow-400 hover:underline">
            Privacy Policy
          </a>
          . <br />© {new Date().getFullYear()} Secret Verse Vendor. All rights
          reserved.
        </p>
      </CardContent>
    </motion.div>
  );
}
