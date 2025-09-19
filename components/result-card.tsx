"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { Trophy, Gift, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface ResultCardProps {
  result: {
    type: "cash" | "product"
    amount?: number
    product?: {
      name: string
      image: string
    }
  }
  contestName: string
}

export default function ResultCard({ result, contestName }: ResultCardProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const router = useRouter()

  useEffect(() => {
    setShowConfetti(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const isCashWin = result.type === "cash"

  return (
    <div className="flex flex-col items-center">
      {showConfetti && isCashWin && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          colors={["#FFD700", "#FFA500", "#FF8C00", "#FFFF00", "#FFE55C"]}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`bg-gradient-to-br ${
          isCashWin
            ? "from-yellow-400/20 to-yellow-600/20 border-yellow-500/50"
            : "from-purple-400/20 to-pink-600/20 border-purple-500/50"
        } border-2 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center`}
      >
        {isCashWin ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-8xl mb-4"
            >
              🎉
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-bold text-yellow-400 mb-2"
            >
              Congratulations!
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl p-6 mb-6"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="w-8 h-8" />
                <span className="text-2xl font-bold">You Won!</span>
              </div>
              <div className="text-5xl font-bold">₹{result.amount}</div>
            </motion.div>

            <p className="text-white text-lg mb-6">Amazing! You've won a cash prize in {contestName}!</p>
          </>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-6xl mb-4"
            >
              🛍️
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold text-white mb-4"
            >
              You didn't win a cash prize,
              <br />
              <span className="text-purple-400">but here's your consolation product!</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 mb-6"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={result.product!.image || "/placeholder.svg"}
                  alt={result.product!.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Gift className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold text-white">You Won!</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">{result.product!.name}</div>
            </motion.div>
          </>
        )}

        <div className="space-y-3">
          <Button
            onClick={() => router.push("/my-tickets")}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            View in My Tickets
          </Button>

          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="w-full border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
          >
            Play Another Contest
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
