"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
    

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.refresh(); // Refresh the page to update user state
    router.push("/login"); // Redirect to login page
  }

  return (
    <Button
      variant="outline"
      className="border-yellow-500 text-yellow-500 hover:bg-yellow-600/10"
        onClick={handleLogout}
    >
      <LogOut className="w-4 h-4 mr-1" /> Logout
    </Button>
  );
}
