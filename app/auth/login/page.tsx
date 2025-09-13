"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // You’ll later integrate with Google Auth here
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('/hero-background.jpg')", // 👉 use your background image here
      }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/60"></div> */}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
          <Card className="bg-gray-900/40 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-700/30">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-playfair text-yellow-400">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                Login to continue to Secret Verse
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 bg-black/40 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 bg-black/40 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                    required
                  />
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href="/forgot-password"
                    className="text-sm text-yellow-400 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-500 rounded-full py-3 font-semibold shadow-lg shadow-yellow-500/40 transition-all duration-300"
                >
                  Login
                </Button>

                {/* Google Button */}
                <Button
                  type="button"
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-gray-500 text-gray-200 hover:text-white  bg-black/40 hover:bg-gray-800 rounded-full py-3 transition-all duration-300"
                >
                  <FcGoogle className="text-xl" />
                  Continue with Google
                </Button>
              </form>

              <p className="text-center text-gray-400 mt-6 text-sm">
                Don’t have an account?{" "}
                <a
                  href="/auth/register"
                  className="text-yellow-400 hover:underline font-medium"
                >
                  Register here
                </a>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
