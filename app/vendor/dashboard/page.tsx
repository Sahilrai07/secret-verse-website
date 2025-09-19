"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  BarChart3,
  Star,
  ShoppingBag,
  CheckCircle,
  Clock,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  Ticket,
  UserPlus,
  Trophy,
  Banknote,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface VendorStats {
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  totalViews: number;
  pendingOrders: number;
  completedOrders: number;
  averageRating: number;
  totalReviews: number;
  usersCreated: number;
  ticketsPurchased: number;
  ticketEarnings: number;
  cashOnHand: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  coinPrice: number;
  discountPrice?: number;
  image: string;
  category: string;
  stock: number;
  status: "active" | "inactive" | "out_of_stock";
  views: number;
  sales: number;
  rating: number;
  reviews: number;
  dateAdded: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  products: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  shippingAddress: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
  totalTickets: number;
  totalSpent: number;
  status: "active" | "inactive";
  winnings: number;
}

interface Contest {
  id: string;
  name: string;
  prizeImage: string;
  ticketPrice: number;
}

export default function VendorDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock vendor data
  const [vendorInfo] = useState({
    businessName: "TechGear Solutions",
    ownerName: "Rajesh Kumar",
    email: "rajesh@techgear.com",
    phone: "+91 98765 43210",
    address: "123 Business Park, Mumbai, Maharashtra 400001",
    joinDate: "2023-06-15",
    avatar: "/placeholder.svg?height=120&width=120&text=TG",
    verified: true,
  });

  const [stats, setStats] = useState<VendorStats>({
    totalProducts: 24,
    totalSales: 156,
    totalRevenue: 245000,
    totalViews: 12500,
    pendingOrders: 8,
    completedOrders: 148,
    averageRating: 4.6,
    totalReviews: 89,
    usersCreated: 45,
    ticketsPurchased: 128,
    ticketEarnings: 89500,
    cashOnHand: 15000,
  });

  // const [users, setUsers] = useState<User[]>([
  //   {
  //     id: "U001",
  //     fullName: "John Doe",
  //     email: "john.doe@example.com",
  //     avatar: "/placeholder.svg?height=80&width=80&text=JD",
  //     totalTickets: 15,
  //     totalSpent: 7500,
  //     status: "active",
  //     winnings: 25000,

  const [contests, setContests] = useState<Contest[]>([
    {
      id: "C001",
      name: "Grand Prize Draw",
      prizeImage: "/placeholder.svg?height=80&width=80&text=GP",
      ticketPrice: 500,
    },
    {
      id: "C002",
      name: "Weekly Raffle",
      prizeImage: "/placeholder.svg?height=80&width=80&text=WR",
      ticketPrice: 200,
    },
    {
      id: "C003",
      name: "Monthly Jackpot",
      prizeImage: "/placeholder.svg?height=80&width=80&text=MJ",
      ticketPrice: 1000,
    },
  ]);

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "My Users", icon: Users },
    { id: "tickets", label: "Ticket Sales", icon: Ticket },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-500/20 border-green-500/30";
      case "inactive":
        return "text-gray-400 bg-gray-500/20 border-gray-500/30";
      case "out_of_stock":
        return "text-red-400 bg-red-500/20 border-red-500/30";
      case "pending":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      case "confirmed":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30";
      case "shipped":
        return "text-purple-400 bg-purple-500/20 border-purple-500/30";
      case "delivered":
        return "text-green-400 bg-green-500/20 border-green-500/30";
      case "cancelled":
        return "text-red-400 bg-red-500/20 border-red-500/30";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    }
  };

  const handleGetUsers = async () => {
    try {
      // Simulate fetching users from an API
      const response = await fetch("/api/users/get");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle error appropriately, e.g., show a notification or alert
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-black border-r border-yellow-500/30 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src={vendorInfo.avatar || "/placeholder.svg"}
                  alt={vendorInfo.businessName}
                  fill
                  className="object-cover rounded-full border-2 border-yellow-500/50"
                />
                {vendorInfo.verified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-white font-bold text-sm">
                  {vendorInfo.businessName}
                </h2>
                <p className="text-gray-400 text-xs">{vendorInfo.ownerName}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 text-yellow-400"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white"
            >
              <Bell className="w-4 h-4 mr-3" />
              Notifications
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/login")}
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <div className="bg-black/50 backdrop-blur-sm border-b border-yellow-500/20 sticky top-0 z-30">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-white hover:text-yellow-400"
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl font-bold text-white">
                  {tabs.find((tab) => tab.id === activeTab)?.label} Dashboard
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Bell className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <Link href="/vendor/profile">
                  <div className="relative w-8 h-8">
                    <Image
                      src={vendorInfo.avatar || "/placeholder.svg"}
                      alt={vendorInfo.ownerName}
                      fill
                      className="object-cover rounded-full border border-yellow-500/50"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Welcome back, {vendorInfo.ownerName}! 👋
                      </h2>
                      <p className="text-gray-300">
                        Here's what's happening with your store today
                      </p>
                    </div>
                    <div className="text-6xl">🏪</div>
                  </div>
                </div>

                {/* New Vendor Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 rounded-xl p-6 text-center"
                  >
                    <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {stats.usersCreated}
                    </div>
                    <div className="text-cyan-400 text-sm">Users Created</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6 text-center"
                  >
                    <Ticket className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {stats.ticketsPurchased}
                    </div>
                    <div className="text-orange-400 text-sm">Tickets Sold</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-xl p-6 text-center"
                  >
                    <DollarSign className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      ₹{stats.ticketEarnings.toLocaleString()}
                    </div>
                    <div className="text-emerald-400 text-sm">
                      Ticket Earnings
                    </div>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        Recent Orders
                      </h3>
                      <Button
                        onClick={() => setActiveTab("orders")}
                        variant="ghost"
                        size="sm"
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        View All
                      </Button>
                    </div>
                    {/* <div className="space-y-3">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                          <div>
                            <div className="text-white font-semibold">#{order.id}</div>
                            <div className="text-gray-400 text-sm">{order.customerName}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-yellow-400 font-bold">₹{order.total}</div>
                            <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div> */}
                  </div>

                  {/* Top Products */}
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        Top Products
                      </h3>
                      <Button
                        onClick={() => setActiveTab("products")}
                        variant="ghost"
                        size="sm"
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        View All
                      </Button>
                    </div>
                    {/* <div className="space-y-3">
                      {products.slice(0, 3).map((product) => (
                        <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-semibold text-sm">{product.name}</div>
                            <div className="text-gray-400 text-xs">{product.sales} sales</div>
                          </div>
                          <div className="text-yellow-400 font-bold">₹{product.price}</div>
                        </div>
                      ))}
                    </div> */}
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div className="space-y-6">
                {/* Users Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Users Management
                    </h2>
                    <p className="text-gray-300">
                      Manage users created by you and their activities
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link href="/vendor/users/create">
                      <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create User
                      </Button>
                    </Link>
                    <Link href="/vendor/tickets/buy">
                      <Button
                        variant="outline"
                        className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                      >
                        <Ticket className="w-4 h-4 mr-2" />
                        Buy Tickets
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 rounded-xl p-4 text-center">
                    <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">
                      {stats.usersCreated}
                    </div>
                    <div className="text-cyan-400 text-sm">Users Created</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-4 text-center">
                    <Ticket className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">
                      {stats.ticketsPurchased}
                    </div>
                    <div className="text-orange-400 text-sm">Tickets Sold</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4 text-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">
                      {users.filter((u) => u.status === "active").length}
                    </div>
                    <div className="text-green-400 text-sm">Active Users</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-xl p-4 text-center">
                    <DollarSign className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">
                      ₹{stats.ticketEarnings.toLocaleString()}
                    </div>
                    <div className="text-emerald-400 text-sm">
                      Ticket Earnings
                    </div>
                  </div>
                </div>

                {/* Recent Users */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">
                      Recent Users
                    </h3>
                    <Link href="/vendor/users">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        View All
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {users?.length > 0 ? (
                      users.slice(0, 5).map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10">
                              <Image
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.fullName}
                                fill
                                className="object-cover rounded-full"
                              />
                            </div>
                            <div>
                              <div className="text-white font-semibold">
                                {user.fullName}
                              </div>
                              <div className="text-gray-400 text-sm">
                                {user.email}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-yellow-400 font-bold">
                              {user.totalTickets} tickets
                            </div>
                            <div className="text-gray-400 text-sm">
                              ₹{user.totalSpent}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                      no users
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tickets Tab */}
            {activeTab === "tickets" && (
              <div className="space-y-6">
                {/* Tickets Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Ticket Sales Management
                    </h2>
                    <p className="text-gray-300">
                      Track and manage ticket sales for your users
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link href="/vendor/tickets/buy">
                      <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold">
                        <Ticket className="w-4 h-4 mr-2" />
                        Buy Tickets
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Sales
                    </Button>
                  </div>
                </div>

                {/* Sales Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4 text-center">
                    <Ticket className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">
                      {stats.ticketsPurchased}
                    </div>
                    <div className="text-blue-400 text-sm">Total Tickets</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4 text-center">
                    <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">
                      ₹{stats.ticketEarnings.toLocaleString()}
                    </div>
                    <div className="text-green-400 text-sm">Total Earnings</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4 text-center">
                    <Trophy className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">
                      {users
                        .reduce((sum, u) => sum + u.winnings, 0)
                        .toLocaleString()}
                    </div>
                    <div className="text-purple-400 text-sm">User Winnings</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                    <Banknote className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">
                      ₹{stats.cashOnHand.toLocaleString()}
                    </div>
                    <div className="text-yellow-400 text-sm">Cash on Hand</div>
                  </div>
                </div>

                {/* Payment Methods Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Payment Methods
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-blue-400" />
                          <span className="text-white">Online Payments</span>
                        </div>
                        <div className="text-right">
                          <div className="text-blue-400 font-bold">
                            ₹
                            {Math.floor(
                              stats.ticketEarnings * 0.7
                            ).toLocaleString()}
                          </div>
                          <div className="text-gray-400 text-sm">70%</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Banknote className="w-5 h-5 text-green-400" />
                          <span className="text-white">Cash Payments</span>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold">
                            ₹
                            {Math.floor(
                              stats.ticketEarnings * 0.3
                            ).toLocaleString()}
                          </div>
                          <div className="text-gray-400 text-sm">30%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Top Contests
                    </h3>
                    <div className="space-y-3">
                      {contests.slice(0, 3).map((contest) => (
                        <div
                          key={contest.id}
                          className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8">
                              <Image
                                src={contest.prizeImage || "/placeholder.svg"}
                                alt={contest.name}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <div>
                              <div className="text-white font-semibold text-sm">
                                {contest.name}
                              </div>
                              <div className="text-gray-400 text-xs">
                                ₹{contest.ticketPrice}/ticket
                              </div>
                            </div>
                          </div>
                          <div className="text-yellow-400 font-bold text-sm">
                            {Math.floor(Math.random() * 20) + 5} sold
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Ticket Sales */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Recent Ticket Sales
                  </h3>
                  <div className="space-y-3">
                    {users.slice(0, 5).map((user, index) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10">
                            <Image
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.fullName}
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>
                          <div>
                            <div className="text-white font-semibold">
                              {user.fullName}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {contests[index % contests.length]?.name} -{" "}
                              {Math.floor(Math.random() * 5) + 1} tickets
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-400 font-bold">
                            ₹{Math.floor(Math.random() * 500) + 100}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {Math.floor(Math.random() * 5) + 1}h ago
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Analytics & Reports
                    </h2>
                    <p className="text-gray-300">
                      Track your business performance and insights
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <select className="bg-gray-800 border border-yellow-500/30 text-white rounded-lg px-3 py-2">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                    </select>
                    <Button
                      variant="outline"
                      className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">
                        Revenue Trend
                      </h3>
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      +24%
                    </div>
                    <div className="text-gray-400 text-sm">vs last month</div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">
                        Customer Rating
                      </h3>
                      <Star className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {stats.averageRating}
                    </div>
                    <div className="text-gray-400 text-sm">
                      from {stats.totalReviews} reviews
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">
                        Conversion Rate
                      </h3>
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      3.2%
                    </div>
                    <div className="text-gray-400 text-sm">views to sales</div>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Sales Overview
                  </h3>
                  <div className="h-64 bg-gray-800/50 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <div className="text-gray-400">
                        Sales chart would be displayed here
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Vendor Settings
                  </h2>
                  <p className="text-gray-300">
                    Manage your business profile and preferences
                  </p>
                </div>

                {/* Business Information */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Business Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Business Name
                      </label>
                      <Input
                        value={vendorInfo.businessName}
                        className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Owner Name
                      </label>
                      <Input
                        value={vendorInfo.ownerName}
                        className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Email
                      </label>
                      <Input
                        value={vendorInfo.email}
                        className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Phone
                      </label>
                      <Input
                        value={vendorInfo.phone}
                        className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-white font-semibold mb-2">
                      Business Address
                    </label>
                    <Input
                      value={vendorInfo.address}
                      className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>
                  <div className="mt-6">
                    <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold">
                      Save Changes
                    </Button>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    {[
                      "New orders",
                      "Low stock alerts",
                      "Customer reviews",
                      "Payment notifications",
                      "Marketing updates",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between"
                      >
                        <span className="text-white">{item}</span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
