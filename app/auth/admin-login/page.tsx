"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

const AdminLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AdminLoginFormValues = z.infer<typeof AdminLoginSchema>;

export default function AdminLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(AdminLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: AdminLoginFormValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      // Optionally: pass a role flag to differentiate admin login on backend
      role: "ADMIN",
    });

    if (result?.error) {
      setError("password", { type: "server", message: "Invalid email or password" });
      toast.error("Login failed. Please check your credentials and try again.");
      return;
    }

    toast.success("Welcome Admin! You've successfully logged in.");
    window.location.href = "/admin/dashboard"; // redirect to admin dashboard
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
          Admin Login
        </CardTitle>
        <CardDescription className="text-gray-300">
          Sign in to access the admin dashboard
        </CardDescription>
      </CardHeader>

      {/* Form */}
      <CardContent className="space-y-6">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300 text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="bg-black/40 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
            />
            {errors.email && (
              <p id="email-error" className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2 relative">
            <Label
              htmlFor="password"
              className={`text-sm ${errors.password ? "text-red-400" : "text-gray-300"}`}
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
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-500 rounded-full py-3 font-semibold shadow-lg shadow-yellow-500/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

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
          . <br />© {new Date().getFullYear()} Secret Verse. All rights reserved.
        </p>
      </CardContent>
    </motion.div>
  );
}
