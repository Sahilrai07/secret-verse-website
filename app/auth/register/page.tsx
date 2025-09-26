"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

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

// ✅ Zod schema for validation
const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the Terms & Privacy Policy" }),
  }),
});

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "", acceptTerms: true },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("Register form submitted:", data);
    // TODO: integrate API call for registration
  };

  const handleGoogleRegister = () => {
    console.log("Google register clicked");
    // TODO: integrate Google signup with next-auth or backend
  };

  const [showPassword, setShowPassword] = useState(false);

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
          Create Account
        </CardTitle>
        <CardDescription className="text-gray-300">
          Join Secret Verse and start your journey
        </CardDescription>
      </CardHeader>

      {/* Form */}
      <CardContent className="space-y-6">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-describedby="register-form-errors"
        >
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300 text-sm">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name")}
              aria-invalid={!!errors.name}
              className="bg-black/40 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300 text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
              className="bg-black/40 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
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

          {/* Terms & Policy */}
          <div className="flex items-start gap-2">
            <input
              id="terms"
              type="checkbox"
              {...register("acceptTerms")}
              aria-invalid={!!errors.acceptTerms}
              className="mt-1 w-4 h-4 text-yellow-400 bg-black/40 border-gray-600 rounded focus:ring-yellow-400"
            />
            <div className="text-sm text-gray-400">
              <label htmlFor="terms" className="cursor-pointer">
                I agree to the{" "}
                <a href="/terms" className="text-yellow-400 hover:underline">
                  Terms
                </a>{" "}
                &{" "}
                <a href="/privacy" className="text-yellow-400 hover:underline">
                  Privacy Policy
                </a>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.acceptTerms.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-500 rounded-full py-3 font-semibold shadow-lg shadow-yellow-500/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="absolute w-full h-px bg-gray-700"></div>
          <span className="relative bg-gray-900/40 px-3 text-gray-400 text-sm">
            OR
          </span>
        </div>

        {/* Google Button */}
        <Button
          type="button"
          onClick={handleGoogleRegister}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-gray-600 text-gray-200 hover:text-white bg-black/40 hover:bg-gray-800 rounded-full py-3 transition-all duration-300"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </Button>

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-yellow-400 hover:underline font-medium"
          >
            Login here
          </a>
        </p>

        {/* Bottom Text */}
        <p className="text-center text-xs text-gray-500 mt-8">
          By registering, you agree to our{" "}
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
