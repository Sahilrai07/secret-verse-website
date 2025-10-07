"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black px-4">
      <Card className="max-w-md w-full text-center border border-yellow-500 shadow-lg">
        <CardHeader>
          <div className="flex justify-center text-yellow-500">
            <AlertTriangle className="w-12 h-12" />
          </div>
          <CardTitle className="text-2xl font-semibold mt-2 text-yellow-500">
            Unauthorized Access
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-zinc-300">
          <p>You don&apos;t have permission to view this page.</p>

          <Button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
            onClick={() => router.push("/")}
          >
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
