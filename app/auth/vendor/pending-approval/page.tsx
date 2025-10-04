"use client";
import { motion } from "framer-motion";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VendorPendingApprovalPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <CardHeader className="text-center space-y-2 pb-6">
        <CardTitle className="text-3xl md:text-4xl font-playfair text-yellow-400">
          Pending Approval
        </CardTitle>
        <CardDescription className="text-gray-300">
          Your vendor account has been submitted successfully.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 text-center">
        <p className="text-gray-400 text-sm">
          Your account is currently awaiting approval from the admin. Once approved, you will
          be able to access your vendor dashboard.
        </p>

        <p className="text-gray-400 text-sm">
          You will receive an email notification once your account is approved.
        </p>

        <Button
          className="bg-yellow-400 text-black font-semibold w-full"
          onClick={() => (window.location.href = "/auth/vendor/login")}
        >
          Go to Login
        </Button>

        <p className="text-xs text-gray-500 mt-4">
          © {new Date().getFullYear()} Secret Verse Vendor. All rights reserved.
        </p>
      </CardContent>
    </motion.div>
  );
}
