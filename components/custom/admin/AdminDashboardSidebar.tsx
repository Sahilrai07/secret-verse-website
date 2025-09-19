"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  Package,
  Users,
  UserCheck,
  UserCog,
  ShoppingCart,
  Tag,
  Store,
  Settings,
  LifeBuoy,
  Trophy,
  Megaphone,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

const navItems = [
  {
    label: "Main",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
      { name: "Orders", icon: ShoppingCart, href: "/admin/orders" },
      { name: "Products", icon: Package, href: "/admin/products" },
      { name: "Categories", icon: Tag, href: "/admin/categories" },
    ],
  },
  {
    label: "Users",
    items: [
      { name: "All Users", icon: Users, href: "/admin/users" },
      { name: "Vendors", icon: Store, href: "/admin/vendors" },
      { name: "Admins", icon: UserCog, href: "/admin/admins" },
    ],
  },
  {
    label: "Activities",
    items: [
      { name: "Contests", icon: Trophy, href: "/admin/contests" },
      { name: "Marketing", icon: Megaphone, href: "/admin/marketing" },
    ],
  },
  {
    label: "Support",
    items: [
      { name: "Support", icon: LifeBuoy, href: "/admin/support" },
      { name: "Settings", icon: Settings, href: "/admin/settings" },
    ],
  },
];

const EcommerceSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-68 border-r bg-background/50 backdrop-blur-lg">
      {/* Logo */}
      <div className="flex h-[74px] items-center gap-2 border-b px-6">
        <Image src={"/logo.png"} alt="logo" width={50} height={50} />
        <span className="text-2xl font-bold text-primary">SuperVision</span>
      </div>

      {/* Search */}
      <div className="px-4 py-4">
        <Input placeholder="Search..." className="bg-background/60" />
      </div>

      {/* Navigation */}
      <nav className="space-y-6 px-2">
        {navItems.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {section.label}
            </div>
            {section.items.map((item, index) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link key={index} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={clsx(
                      "w-full justify-start gap-2",
                      isActive && "bg-primary font-semibold"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default EcommerceSidebar;
