"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Star,
  TrendingUp,
  Package,
  DollarSign,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Download,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface VendorProfile {
  id: string
  businessName: string
  ownerName: string
  email: string
  phone: string
  address: string
  city: string
  pincode: string
  businessType: string
  gstNumber: string
  panNumber: string
  bankAccount: string
  ifscCode: string
  joinDate: string
  avatar: string
  verified: boolean
  rating: number
  totalReviews: number
  totalProducts: number
  totalSales: number
  totalRevenue: number
  completionRate: number
}

export default function VendorProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false)

  // Mock vendor data
  const [vendorProfile, setVendorProfile] = useState<VendorProfile>({
    id: "vendor123",
    businessName: "TechGear Solutions",
    ownerName: "Rajesh Kumar",
    email: "rajesh@techgear.com",
    phone: "+91 98765 43210",
    address: "123 Business Park, Tech Hub",
    city: "Mumbai",
    pincode: "400001",
    businessType: "Electronics Retailer",
    gstNumber: "27ABCDE1234F1Z5",
    panNumber: "ABCDE1234F",
    bankAccount: "1234567890",
    ifscCode: "HDFC0001234",
    joinDate: "2023-06-15",
    avatar: "/placeholder.svg?height=120&width=120&text=TG",
    verified: true,
    rating: 4.6,
    totalReviews: 89,
    totalProducts: 24,
    totalSales: 156,
    totalRevenue: 245000,
    completionRate: 98.5,
  })

  const [editForm, setEditForm] = useState(vendorProfile)

  const [documents, setDocuments] = useState([
    { id: 1, name: "GST Certificate", status: "verified", uploadDate: "2023-06-15" },
    { id: 2, name: "PAN Card", status: "verified", uploadDate: "2023-06-15" },
    { id: 3, name: "Bank Statement", status: "pending", uploadDate: "2024-01-15" },
    { id: 4, name: "Business License", status: "verified", uploadDate: "2023-06-15" },
  ])

  const [recentActivity] = useState([
    { id: 1, type: "sale", description: "New order received - #ORD001", date: "2024-01-20", amount: 4998 },
    { id: 2, type: "product", description: "Product updated - Wireless Earbuds", date: "2024-01-19" },
    { id: 3, type: "review", description: "New 5-star review received", date: "2024-01-18" },
    { id: 4, type: "payout", description: "Weekly payout processed", date: "2024-01-17", amount: 15000 },
  ])

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "business", label: "Business Info", icon: Building },
    { id: "documents", label: "Documents", icon: Shield },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ]

  const handleSaveProfile = () => {
    setVendorProfile(editForm)
    setIsEditing(false)
    // In real app, save to API
    alert("Profile updated successfully!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "pending":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "rejected":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <DollarSign className="w-4 h-4 text-green-400" />
      case "product":
        return <Package className="w-4 h-4 text-blue-400" />
      case "review":
        return <Star className="w-4 h-4 text-yellow-400" />
      case "payout":
        return <TrendingUp className="w-4 h-4 text-purple-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
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
            <h1 className="text-2xl font-bold text-white">Vendor Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6 sticky top-8">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={vendorProfile.avatar || "/placeholder.svg"}
                    alt={vendorProfile.businessName}
                    fill
                    className="object-cover rounded-full border-2 border-yellow-500/50"
                  />
                  {vendorProfile.verified && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <button className="absolute top-0 right-0 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors">
                    <Camera className="w-3 h-3 text-black" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{vendorProfile.businessName}</h2>
                <p className="text-gray-400 mb-2">{vendorProfile.ownerName}</p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(vendorProfile.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">({vendorProfile.totalReviews})</span>
                </div>
                {vendorProfile.verified ? (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 border border-green-500/30 text-green-400">
                    <Shield className="w-4 h-4 mr-1" />
                    Verified Vendor
                  </div>
                ) : (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500/20 border border-yellow-500/30 text-yellow-400">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Pending Verification
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Products</span>
                  <span className="text-white font-bold">{vendorProfile.totalProducts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Sales</span>
                  <span className="text-green-400 font-bold">{vendorProfile.totalSales}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Revenue</span>
                  <span className="text-yellow-400 font-bold">₹{vendorProfile.totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Completion Rate</span>
                  <span className="text-purple-400 font-bold">{vendorProfile.completionRate}%</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 text-yellow-400"
                          : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                      {!isEditing ? (
                        <Button
                          onClick={() => setIsEditing(true)}
                          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold"
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveProfile}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                          <Button
                            onClick={() => {
                              setIsEditing(false)
                              setEditForm(vendorProfile)
                            }}
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="ownerName" className="text-white font-semibold">
                          <User className="w-4 h-4 inline mr-2" />
                          Owner Name
                        </Label>
                        <Input
                          id="ownerName"
                          value={editForm.ownerName}
                          onChange={(e) => setEditForm({ ...editForm, ownerName: e.target.value })}
                          disabled={!isEditing}
                          className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 disabled:opacity-50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-white font-semibold">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          disabled={!isEditing}
                          className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 disabled:opacity-50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-white font-semibold">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          disabled={!isEditing}
                          className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 disabled:opacity-50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="city" className="text-white font-semibold">
                          <MapPin className="w-4 h-4 inline mr-2" />
                          City
                        </Label>
                        <Input
                          id="city"
                          value={editForm.city}
                          onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                          disabled={!isEditing}
                          className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <Label htmlFor="address" className="text-white font-semibold">
                        Complete Address
                      </Label>
                      <Input
                        id="address"
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 disabled:opacity-50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-6">
                      <div>
                        <Label htmlFor="pincode" className="text-white font-semibold">
                          PIN Code
                        </Label>
                        <Input
                          id="pincode"
                          value={editForm.pincode}
                          onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
                          disabled={!isEditing}
                          className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 disabled:opacity-50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="joinDate" className="text-white font-semibold">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Member Since
                        </Label>
                        <Input
                          id="joinDate"
                          value={new Date(vendorProfile.joinDate).toLocaleDateString()}
                          disabled
                          className="bg-gray-800 border-yellow-500/30 text-white opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div>
                              <div className="text-white font-semibold">{activity.description}</div>
                              <div className="text-gray-400 text-sm">
                                {new Date(activity.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          {activity.amount && (
                            <div className="text-green-400 font-bold">₹{activity.amount.toLocaleString()}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Business Tab */}
              {activeTab === "business" && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-6">Business Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="businessName" className="text-white font-semibold">
                          <Building className="w-4 h-4 inline mr-2" />
                          Business Name
                        </Label>
                        <Input
                          id="businessName"
                          value={vendorProfile.businessName}
                          className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="businessType" className="text-white font-semibold">
                          Business Type
                        </Label>
                        <Input
                          id="businessType"
                          value={vendorProfile.businessType}
                          className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="gstNumber" className="text-white font-semibold">
                          GST Number
                        </Label>
                        <div className="relative">
                          <Input
                            id="gstNumber"
                            type={showSensitiveInfo ? "text" : "password"}
                            value={vendorProfile.gstNumber}
                            className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500 pr-10"
                          />
                          <button
                            onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showSensitiveInfo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="panNumber" className="text-white font-semibold">
                          PAN Number
                        </Label>
                        <Input
                          id="panNumber"
                          type={showSensitiveInfo ? "text" : "password"}
                          value={vendorProfile.panNumber}
                          className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Bank Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="bankAccount" className="text-white font-semibold">
                          Bank Account Number
                        </Label>
                        <Input
                          id="bankAccount"
                          type={showSensitiveInfo ? "text" : "password"}
                          value={vendorProfile.bankAccount}
                          className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="ifscCode" className="text-white font-semibold">
                          IFSC Code
                        </Label>
                        <Input
                          id="ifscCode"
                          value={vendorProfile.ifscCode}
                          className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold">
                        Update Bank Details
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === "documents" && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-white">Document Verification</h3>
                      <Button
                        variant="outline"
                        className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {documents.map((doc) => (
                        <div key={doc.id} className="border border-gray-700 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-white font-semibold">{doc.name}</h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(doc.status)}`}
                            >
                              {doc.status}
                            </span>
                          </div>
                          <div className="text-gray-400 text-sm mb-3">
                            Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                      <h4 className="text-blue-400 font-semibold mb-2">Verification Status</h4>
                      <p className="text-blue-300 text-sm">
                        Your account verification is {vendorProfile.verified ? "complete" : "pending"}.
                        {!vendorProfile.verified && " Please ensure all required documents are uploaded and verified."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === "analytics" && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-white">Performance Analytics</h3>
                      <Button
                        variant="outline"
                        className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                      </Button>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-400 mb-2">{vendorProfile.completionRate}%</div>
                        <div className="text-green-300">Order Completion Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-400 mb-2">{vendorProfile.rating}</div>
                        <div className="text-yellow-300">Average Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-400 mb-2">
                          {Math.round((vendorProfile.totalSales / vendorProfile.totalProducts) * 10) / 10}
                        </div>
                        <div className="text-blue-300">Sales per Product</div>
                      </div>
                    </div>

                    {/* Chart Placeholder */}
                    <div className="h-64 bg-gray-800/50 rounded-xl flex items-center justify-center mb-6">
                      <div className="text-center">
                        <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <div className="text-gray-400">Analytics charts would be displayed here</div>
                      </div>
                    </div>

                    {/* Achievement Badges */}
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4">Achievements</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                          <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                          <div className="text-white font-semibold text-sm">Top Seller</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4 text-center">
                          <Star className="w-8 h-8 text-green-400 mx-auto mb-2" />
                          <div className="text-white font-semibold text-sm">5-Star Vendor</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4 text-center">
                          <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                          <div className="text-white font-semibold text-sm">Verified</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4 text-center">
                          <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                          <div className="text-white font-semibold text-sm">Fast Growth</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
