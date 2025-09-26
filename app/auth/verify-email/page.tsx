"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  // Countdown effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleResend = () => {
    toast.success("Verification email resent successfully!");
    setTimeLeft(300); // reset timer
    setCanResend(false);
  };

  // Format mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Header */}
      <CardHeader className="text-center space-y-3 pb-6">
        <Mail className="mx-auto text-yellow-400 w-12 h-12" />
        <CardTitle className="text-3xl md:text-4xl font-playfair text-yellow-400">
          Verify Your Email
        </CardTitle>
        <CardDescription className="text-gray-300">
          We’ve sent a verification link to your email.  
          Please check your inbox (and spam folder) to continue.
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-6 text-center">
        <Button
          onClick={handleResend}
          disabled={!canResend}
          className="w-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-full py-3 font-semibold shadow-lg shadow-yellow-500/40 transition-all duration-300"
        >
          {canResend
            ? "Resend Verification Email"
            : `Resend available in ${formatTime(timeLeft)}`}
        </Button>

        {/* Bottom Text */}
        <p className="text-sm text-gray-400">
          Already verified?{" "}
          <a
            href="/auth/login"
            className="text-yellow-400 hover:underline font-medium"
          >
            Login here
          </a>
        </p>

        <p className="text-center text-xs text-gray-500 mt-6">
          Didn’t get the email? Wait a few minutes and check your spam folder.  
          If the issue persists, contact{" "}
          <a href="/support" className="text-yellow-400 hover:underline">
            support
          </a>
          .
        </p>
      </CardContent>
    </motion.div>
  );
}
