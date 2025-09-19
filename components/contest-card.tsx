"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Trophy, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Contest {
  id: string
  name: string
  ticketPrice: number
  prizeImage: string
  maxPrize: string
  endTime: Date
}

interface ContestCardProps {
  contest: Contest
}

export default function ContestCard({ contest }: ContestCardProps) {
  const [timeLeft, setTimeLeft] = useState("")
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = contest.endTime.getTime() - now

      if (distance < 0) {
        setTimeLeft("EXPIRED")
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(timer)
  }, [contest.endTime])

  const handleBuyTicket = () => {
    // Navigate to checkout page with contest data
    router.push(`/checkout?contestId=${contest.id}`)
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl overflow-hidden shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300"
    >
      {/* Prize Image */}
      <div className="relative h-48 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10">
        <Image src={contest.prizeImage || "/placeholder.svg"} alt={contest.name} fill className="object-cover" />
        <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
          Up to {contest.maxPrize}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{contest.name}</h3>

        {/* Countdown */}
        <div className="flex items-center gap-2 mb-4 text-yellow-400">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-mono">{timeLeft}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-bold text-white">₹{contest.ticketPrice}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <Trophy className="w-4 h-4" />
            <span className="text-sm">Guaranteed Win</span>
          </div>
        </div>

        {/* Buy Button */}
        <Button
          onClick={handleBuyTicket}
          disabled={timeLeft === "EXPIRED"}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {timeLeft === "EXPIRED" ? "Contest Ended" : "Buy Ticket & Play"}
        </Button>
      </div>
    </motion.div>
  )
}
