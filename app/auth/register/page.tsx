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
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password });
  };

    const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // You’ll later integrate with Google Auth here
    };

  return (
    <div className="relative min-h-screen min-w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero-background.jpg" // 👉 use the same bg as login or replace
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Glassmorphic Register Box */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
          <Card className="bg-gray-900/40 backdrop-blur-lg border border-gray-700/40 shadow-2xl rounded-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-playfair text-yellow-400">
                Create Account
              </CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                Register to join Secret Verse
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-6" onSubmit={handleRegister}>
                <div>
                  <Label htmlFor="name" className="text-gray-300">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 bg-black/40 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                    required
                  />
                </div>

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

                <Button
                  type="submit"
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-500 rounded-full py-3 font-semibold shadow-lg shadow-yellow-500/40 transition-all duration-300"
                >
                  Register
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
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="text-yellow-400 hover:underline font-medium"
                >
                  Login here
                </a>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
