"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export default function EmailVerifiedPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;

      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Verification failed");
          setVerified(false);
        } else {
          toast.success("Your email has been verified!");
          setVerified(true);
          if (data.email) setEmail(data.email);
        }
      } catch (error) {
        console.error("Verification Error:", error);
        toast.error("Something went wrong");
        setVerified(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto mt-20"
    >
      <CardHeader className="text-center space-y-2 pb-6">
        <CardTitle
          className={`text-3xl md:text-4xl font-playfair ${
            verified ? "text-yellow-400" : "text-red-400"
          }`}
        >
          {loading
            ? "Verifying..."
            : verified
            ? "Email Verified"
            : "Verification Failed"}
        </CardTitle>
        {!loading && (
          <CardDescription className="text-gray-300">
            {verified
              ? "Your email has been successfully verified. You can now log in to your account."
              : "The verification link is invalid, expired, or already used."}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-6 text-center">
        {loading && (
          <p className="text-gray-300">Verifying your email, please wait...</p>
        )}

        {!loading && verified && (
          <div className="space-y-4">
            <CheckCircle size={64} className="mx-auto text-green-400" />
            {email && (
              <p className="text-gray-300">
                Verified Email:{" "}
                <span className="text-yellow-400 font-medium">{email}</span>
              </p>
            )}
            <p className="text-gray-400 text-sm">
              Thank you for verifying your account. You can now explore all
              features.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 rounded-full py-3 font-semibold shadow-lg shadow-yellow-500/40 transition-all duration-300"
                onClick={() => (window.location.href = "/auth/login")}
              >
                Go to Login
              </Button>
              <Button
                variant="outline"
                className="w-full text-gray-200 border-gray-600 bg-black/40 hover:bg-gray-800 rounded-full py-3 transition-all duration-300"
                onClick={() => (window.location.href = "/")}
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}

        {!loading && !verified && (
          <div className="space-y-4">
            <XCircle size={64} className="mx-auto text-red-400" />
            <p className="text-gray-400 text-sm">
              If you didn't receive a new link, you can request another
              verification email.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 rounded-full py-3 font-semibold shadow-lg shadow-yellow-500/40 transition-all duration-300"
                onClick={() =>
                  (window.location.href = "/auth/verify-email")
                }
              >
                Resend Verification Email
              </Button>
              <Button
                variant="outline"
                className="w-full text-gray-200 border-gray-600 bg-black/40 hover:bg-gray-800 rounded-full py-3 transition-all duration-300"
                onClick={() => (window.location.href = "/")}
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </motion.div>
  );
}
