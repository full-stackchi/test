"use client"

import { useEffect, useRef } from "react"

export function CodeBlock({ code }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const fontSize = 16
    const lineHeight = fontSize * 1.5
    const padding = 16

    // Split code into lines
    const lines = code.split("\n")

    // Calculate canvas dimensions
    const maxLineWidth = Math.max(...lines.map((line) => ctx.measureText(line).width))
    canvas.width = maxLineWidth + padding * 2
    canvas.height = lines.length * lineHeight + padding * 2

    // Set background
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw border
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    // Set text style
    ctx.font = `${fontSize}px monospace`
    ctx.fillStyle = "#1e293b"

    // Draw text
    lines.forEach((line, index) => {
      ctx.fillText(line, padding, padding + lineHeight * index + fontSize)
    })

    // Add watermark to prevent copying
    ctx.font = "12px Arial"
    ctx.fillStyle = "rgba(100, 100, 100, 0.2)"
    ctx.fillText("Nusxa ko'chirib bo'lmaydi", canvas.width / 2 - 70, canvas.height - 10)
  }, [code])

  return (
    <div className="relative rounded-md overflow-hidden border border-gray-200 bg-gray-50">
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ userSelect: "none" }}
        onContextMenu={(e) => e.preventDefault()}
      />
      <div className="absolute inset-0" style={{ pointerEvents: "none" }}></div>
    </div>
  )
}
