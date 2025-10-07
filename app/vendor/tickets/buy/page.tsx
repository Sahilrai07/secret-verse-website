"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, Plus, Minus, User, CreditCard, Banknote, ShoppingBag, AlertCircle, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

const contests = [
  {
    id: "1",
    name: "Golden Jackpot",
    ticketPrice: 50,
    prizeImage: "/placeholder.svg?height=200&width=200",
    maxPrize: "₹10,000",
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "Tech Bonanza",
    ticketPrice: 100,
    prizeImage: "/placeholder.svg?height=200&width=200",
    maxPrize: "₹25,000",
    endTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
  },
  {
    id: "3",
    name: "Lucky Draw",
    ticketPrice: 25,
    prizeImage: "/placeholder.svg?height=200&width=200",
    maxPrize: "₹5,000",
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
  },
]

const mockUsers = [
  {
    id: "u1",
    fullName: "Amit Sharma",
    email: "amit@example.com",
    avatar: "/placeholder.svg?height=80&width=80&text=AS",
  },
  {
    id: "u2",
    fullName: "Priya Patel",
    email: "priya@example.com",
    avatar: "/placeholder.svg?height=80&width=80&text=PP",
  },
]

interface PaymentInfo {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
}

export default function BuyTicketsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const userId = searchParams.get("userId")
  const bulkUsers = searchParams.get("users")?.split(",") || []

  const [selectedContest, setSelectedContest] = useState<string>("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>(userId ? [userId] : bulkUsers)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">("online")
  const [isLoading, setIsLoading] = useState(false)
  const [cashOnHand, setCashOnHand] = useState(15000) // Mock cash balance

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  useEffect(() => {
    // Initialize quantities for selected users
    const initialQuantities: Record<string, number> = {}
    selectedUsers.forEach((userId) => {
      initialQuantities[userId] = 1
    })
    setQuantities(initialQuantities)
  }, [selectedUsers])

  const selectedContestData = contests.find((c) => c.id === selectedContest)
  const selectedUsersData = mockUsers.filter((u) => selectedUsers.includes(u.id))

  const getTotalTickets = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0)
  }

  const getTotalAmount = () => {
    if (!selectedContestData) return 0
    return getTotalTickets() * selectedContestData.ticketPrice
  }

  const updateQuantity = (userId: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [userId]: Math.max(1, Math.min(10, (prev[userId] || 1) + change)),
    }))
  }

  const handlePurchase = async () => {
    if (!selectedContest) {
      alert("Please select a contest")
      return
    }

    if (selectedUsers.length === 0) {
      alert("Please select at least one user")
      return
    }

    const totalAmount = getTotalAmount()

    if (paymentMethod === "cash" && totalAmount > cashOnHand) {
      alert("Insufficient cash on hand")
      return
    }

    if (paymentMethod === "online" && (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv)) {
      alert("Please fill in all payment details")
      return
    }

    setIsLoading(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Create purchases for each user
      selectedUsers.forEach((userId) => {
        const user = mockUsers.find((u) => u.id === userId)
        if (!user) return

        const quantity = quantities[userId] || 1
        const userTotal = quantity * selectedContestData!.ticketPrice

        // Store purchase in localStorage
        const purchases = JSON.parse(localStorage.getItem("contestPurchases") || "[]")
        const newPurchase = {
          id: Date.now().toString() + userId,
          contestId: selectedContest,
          contestName: selectedContestData!.name,
          quantity,
          total: userTotal,
          userId,
          userName: user.fullName,
          userEmail: user.email,
          purchasedBy: "vendor",
          vendorId: "vendor123",
          paymentMethod,
          purchaseDate: new Date().toISOString(),
          tickets: Array.from({ length: quantity }, (_, i) => ({
            id: `${Date.now()}-${userId}-${i}`,
            scratched: false,
            result: null,
          })),
        }

        purchases.push(newPurchase)
        localStorage.setItem("contestPurchases", JSON.stringify(purchases))
      })

      // Update cash on hand if cash payment
      if (paymentMethod === "cash") {
        setCashOnHand((prev) => prev - totalAmount)
      }

      alert(`Successfully purchased ${getTotalTickets()} tickets for ${selectedUsers.length} users!`)
      router.push("/vendor/users")
    } catch (error) {
      alert("Error processing purchase. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-yellow-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/vendor/users")}
              className="text-white hover:text-yellow-400"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Users
            </Button>
            <h1 className="text-2xl font-bold text-white">Buy Contest Tickets</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contest Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">Select Contest</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contests.map((contest) => (
                  <div
                    key={contest.id}
                    onClick={() => setSelectedContest(contest.id)}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      selectedContest === contest.id
                        ? "border-yellow-500 bg-yellow-500/10"
                        : "border-gray-600 hover:border-yellow-500/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12">
                        <Image
                          src={contest.prizeImage || "/placeholder.svg"}
                          alt={contest.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{contest.name}</h3>
                        <div className="text-yellow-400 font-bold">₹{contest.ticketPrice}/ticket</div>
                        <div className="text-gray-400 text-sm">{contest.maxPrize} max prize</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* User Selection & Quantities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">Select Users & Quantities</h2>

              {selectedUsersData.length === 0 ? (
                <div className="text-center py-8">
                  <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No users selected</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedUsersData.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
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
                          <div className="text-white font-semibold">{user.fullName}</div>
                          <div className="text-gray-400 text-sm">{user.email}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(user.id, -1)}
                          disabled={quantities[user.id] <= 1}
                          className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>

                        <div className="bg-gray-700 px-4 py-2 rounded-lg min-w-[60px] text-center">
                          <span className="text-white font-bold">{quantities[user.id] || 1}</span>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(user.id, 1)}
                          disabled={quantities[user.id] >= 10}
                          className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div
                  onClick={() => setPaymentMethod("online")}
                  className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    paymentMethod === "online"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 hover:border-blue-500/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-blue-400" />
                    <div>
                      <h3 className="text-white font-semibold">Online Payment</h3>
                      <p className="text-gray-400 text-sm">Pay with credit/debit card</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("cash")}
                  className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    paymentMethod === "cash"
                      ? "border-green-500 bg-green-500/10"
                      : "border-gray-600 hover:border-green-500/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="w-8 h-8 text-green-400" />
                    <div>
                      <h3 className="text-white font-semibold">Cash on Hand</h3>
                      <p className="text-gray-400 text-sm">Available: ₹{cashOnHand.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              {paymentMethod === "online" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardholderName" className="text-white font-semibold">
                        Cardholder Name
                      </Label>
                      <Input
                        id="cardholderName"
                        value={paymentInfo.cardholderName}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })}
                        className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
                        placeholder="Name on card"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber" className="text-white font-semibold">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div>
                      <Label htmlFor="expiryDate" className="text-white font-semibold">
                        Expiry Date
                      </Label>
                      <Input
                        id="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                        className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cvv" className="text-white font-semibold">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        className="bg-gray-800 border-yellow-500/30 text-white focus:border-yellow-500"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "cash" && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-6 h-6 text-green-400" />
                    <div>
                      <h4 className="text-green-400 font-semibold">Cash Payment</h4>
                      <p className="text-green-300 text-sm">Amount will be deducted from your cash on hand balance</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-6 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

              {selectedContestData && (
                <div className="mb-6">
                  <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
                    <Image
                      src={selectedContestData.prizeImage || "/placeholder.svg"}
                      alt={selectedContestData.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{selectedContestData.name}</h4>
                  <div className="text-yellow-400 font-bold">Max Prize: {selectedContestData.maxPrize}</div>
                </div>
              )}

              {/* Summary Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Users Selected:</span>
                  <span>{selectedUsers.length}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Total Tickets:</span>
                  <span>{getTotalTickets()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Price per Ticket:</span>
                  <span>₹{selectedContestData?.ticketPrice || 0}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Payment Method:</span>
                  <span className="capitalize">{paymentMethod}</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total Amount:</span>
                    <span className="text-yellow-400">₹{getTotalAmount()}</span>
                  </div>
                </div>
              </div>

              {/* Purchase Button */}
              <Button
                onClick={handlePurchase}
                disabled={isLoading || !selectedContest || selectedUsers.length === 0}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 rounded-xl"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Purchase Tickets
                  </>
                )}
              </Button>

              {/* Info */}
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                  <div className="text-blue-300 text-sm">
                    Tickets will be automatically assigned to the selected users accounts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
