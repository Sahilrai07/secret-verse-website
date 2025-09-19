"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ScratchCardProps {
  onComplete: () => void
}

export default function ScratchCard({ onComplete }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScratching, setIsScratching] = useState(false)
  const [scratchPercentage, setScratchPercentage] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 320
    canvas.height = 300

    // Draw scratch surface
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#FFD700")
    gradient.addColorStop(0.5, "#FFA500")
    gradient.addColorStop(1, "#FF8C00")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add texture
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
    for (let i = 0; i < 100; i++) {
      ctx.beginPath()
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3, 0, Math.PI * 2)
      ctx.fill()
    }

    // Add "SCRATCH HERE" text
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    ctx.fillText("SCRATCH HERE", canvas.width / 2, canvas.height / 2 - 10)
    ctx.font = "16px Arial"
    ctx.fillText("to reveal your prize!", canvas.width / 2, canvas.height / 2 + 20)

    // Set up scratching
    ctx.globalCompositeOperation = "destination-out"
  }, [])

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    let x, y

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    // Scale coordinates
    x = (x / rect.width) * canvas.width
    y = (y / rect.height) * canvas.height

    ctx.beginPath()
    ctx.arc(x, y, 20, 0, Math.PI * 2)
    ctx.fill()

    // Calculate scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparent = 0

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++
    }

    const percentage = (transparent / (pixels.length / 4)) * 100
    setScratchPercentage(percentage)

    if (percentage > 30) {
      onComplete()
    }
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500/50 rounded-2xl p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">🎫 Your Lucky Ticket</h2>

        <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 mb-6">
          {/* Hidden content */}
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🎁</div>
            <div className="text-2xl font-bold">SURPRISE!</div>
            <div className="text-lg">Scratch to reveal your prize</div>
          </div>

          {/* Scratch overlay */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-pointer rounded-xl"
            onMouseDown={() => setIsScratching(true)}
            onMouseUp={() => setIsScratching(false)}
            onMouseMove={(e) => isScratching && scratch(e)}
            onTouchStart={() => setIsScratching(true)}
            onTouchEnd={() => setIsScratching(false)}
            onTouchMove={(e) => {
              e.preventDefault()
              isScratching && scratch(e)
            }}
            style={{ touchAction: "none" }}
          />
        </div>

        <div className="text-center">
          <div className="text-yellow-400 font-semibold mb-2">Scratched: {Math.round(scratchPercentage)}%</div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${scratchPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-gray-300 text-sm mt-2">Scratch 60% to reveal your prize!</p>
        </div>
      </motion.div>
    </div>
  )
}
