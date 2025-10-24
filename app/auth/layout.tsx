import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      {/* 🔙 Back to Home (top-left) */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/" passHref>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-600 text-gray-200 hover:text-white bg-black/40 hover:bg-gray-800 rounded-full px-4 py-2 transition-all duration-300"
          >
            <Home size={18} />
            Home
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl rounded-2xl border border-gray-700/40 bg-gray-900/70 backdrop-blur-xl">
        {/* Left Section - Image */}
        <div className="relative hidden md:block">
          <Image
            src="/logo.jpg"
            alt="Auth Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Section - Form */}
        <CardContent className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">{children}</div>
        </CardContent>
      </Card>
    </div>
  );
}
