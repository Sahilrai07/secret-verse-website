"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passcode, setPasscode] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admin Login", { email, password, passcode });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md border border-yellow-600 bg-zinc-950 text-yellow-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-yellow-500">
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-yellow-400">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black border-yellow-600 text-yellow-100 placeholder-gray-500 focus-visible:ring-yellow-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-yellow-400">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black border-yellow-600 text-yellow-100 placeholder-gray-500 focus-visible:ring-yellow-500"
              />
            </div>

            {/* Passcode */}
            <div className="space-y-2">
              <Label htmlFor="passcode" className="text-yellow-400">
                Passcode
              </Label>
              <Input
                id="passcode"
                type="text"
                placeholder="Enter admin passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                className="bg-black border-yellow-600 text-yellow-100 placeholder-gray-500 focus-visible:ring-yellow-500"
              />
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full bg-yellow-600 text-black font-semibold hover:bg-yellow-500 transition duration-300"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
