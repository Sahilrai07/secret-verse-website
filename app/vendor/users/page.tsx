"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Search,
  Users,
  MapPin,
  Ticket,
  DollarSign,
  Eye,
  Trash2,
  UserPlus,
  ShoppingBag,
  Clock,
  CheckCircle,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

interface VendorUser {
  id: string
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  pincode: string
  createdDate: string
  status: "active" | "inactive" | "suspended"
  totalTickets: number
  totalSpent: number
  lastActivity: string
  avatar: string
  winnings: number
  contestsParticipated: number
}

export default function VendorUsersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const [users, setUsers] = useState<VendorUser[]>([
    {
      id: "u1",
      fullName: "Amit Sharma",
      email: "amit@example.com",
      phone: "+91 98765 43210",
      address: "123 Main Street, Sector 15",
      city: "Mumbai",
      pincode: "400001",
      createdDate: "2024-01-15",
      status: "active",
      totalTickets: 25,
      totalSpent: 12500,
      lastActivity: "2024-01-20",
      avatar: "/placeholder.svg?height=80&width=80&text=AS",
      winnings: 5000,
      contestsParticipated: 8,
    },
    {
      id: "u2",
      fullName: "Priya Patel",
      email: "priya@example.com",
      phone: "+91 87654 32109",
      address: "456 Garden Road, Andheri",
      city: "Mumbai",
      pincode: "400058",
      createdDate: "2024-01-10",
      status: "active",
      totalTickets: 18,
      totalSpent: 9000,
      lastActivity: "2024-01-19",
      avatar: "/placeholder.svg?height=80&width=80&text=PP",
      winnings: 2500,
      contestsParticipated: 6,
    },
    {
      id: "u3",
      fullName: "Rahul Singh",
      email: "rahul@example.com",
      phone: "+91 76543 21098",
      address: "789 Park Avenue, Bandra",
      city: "Mumbai",
      pincode: "400050",
      createdDate: "2024-01-05",
      status: "inactive",
      totalTickets: 12,
      totalSpent: 6000,
      lastActivity: "2024-01-12",
      avatar: "/placeholder.svg?height=80&width=80&text=RS",
      winnings: 1000,
      contestsParticipated: 4,
    },
  ])

  const [stats] = useState({
    totalUsers: 45,
    activeUsers: 38,
    totalTicketsSold: 128,
    totalEarnings: 89500,
    avgTicketsPerUser: 2.8,
    topSpender: "Amit Sharma",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "inactive":
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
      case "suspended":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
    const matchesFilter = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const deleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId))
    }
  }

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const bulkBuyTickets = () => {
    if (selectedUsers.length === 0) {
      alert("Please select users first")
      return
    }
    router.push(`/vendor/tickets/bulk-buy?users=${selectedUsers.join(",")}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/vendor/dashboard")}
              className="text-white hover:text-yellow-400"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-white">My Users</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6 text-center"
          >
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
            <div className="text-blue-400 text-sm">Total Users</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 text-center"
          >
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.activeUsers}</div>
            <div className="text-green-400 text-sm">Active Users</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6 text-center"
          >
            <Ticket className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.totalTicketsSold}</div>
            <div className="text-orange-400 text-sm">Tickets Sold</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-6 text-center"
          >
            <DollarSign className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">₹{stats.totalEarnings.toLocaleString()}</div>
            <div className="text-yellow-400 text-sm">Total Earnings</div>
          </motion.div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">User Management</h2>
            <p className="text-gray-300">Manage users created by you and their ticket purchases</p>
          </div>
          <div className="flex gap-3">
            {selectedUsers.length > 0 && (
              <Button
                onClick={bulkBuyTickets}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Buy Tickets ({selectedUsers.length})
              </Button>
            )}
            <Link href="/vendor/users/create">
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold">
                <UserPlus className="w-4 h-4 mr-2" />
                Create User
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-800 border border-yellow-500/30 text-white rounded-lg px-3 py-2 focus:border-yellow-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
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

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6 relative"
            >
              {/* Selection Checkbox */}
              <div className="absolute top-4 left-4">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleUserSelection(user.id)}
                  className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500"
                />
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </div>

              {/* User Avatar */}
              <div className="flex justify-center mb-4 mt-6">
                <div className="relative w-16 h-16">
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.fullName}
                    fill
                    className="object-cover rounded-full border-2 border-yellow-500/50"
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-white mb-1">{user.fullName}</h3>
                <p className="text-gray-400 text-sm mb-1">{user.email}</p>
                <p className="text-gray-400 text-sm">{user.phone}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-400">{user.totalTickets}</div>
                  <div className="text-gray-400 text-xs">Tickets</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">₹{user.totalSpent}</div>
                  <div className="text-gray-400 text-xs">Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-400">₹{user.winnings}</div>
                  <div className="text-gray-400 text-xs">Won</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-400">{user.contestsParticipated}</div>
                  <div className="text-gray-400 text-xs">Contests</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center justify-center gap-1 text-gray-400 text-sm mb-4">
                <MapPin className="w-3 h-3" />
                <span>
                  {user.city}, {user.pincode}
                </span>
              </div>

              {/* Last Activity */}
              <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-4">
                <Clock className="w-3 h-3" />
                <span>Last active: {new Date(user.lastActivity).toLocaleDateString()}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link href={`/vendor/users/${user.id}`} className="flex-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </Link>
                <Link href={`/vendor/tickets/buy?userId=${user.id}`} className="flex-1">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold"
                  >
                    <Ticket className="w-4 h-4 mr-1" />
                    Buy
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteUser(user.id)}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No users found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Start by creating your first user"}
            </p>
            <Link href="/vendor/users/create">
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold">
                <UserPlus className="w-4 h-4 mr-2" />
                Create User
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
