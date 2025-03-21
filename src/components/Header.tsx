"use client"
import { Link } from "react-router-dom"
import { HandIcon as PrayingHands } from "lucide-react"

interface HeaderProps {
  onFontSizeChange: (increment: boolean) => void
  siteName: string
  logoUrl: string | null
}

export function Header({ onFontSizeChange, siteName, logoUrl }: HeaderProps) {
  return (
    <header className="bg-[#503d2e] text-white pt-safe pb-4 px-safe">
      <div className="container mx-auto flex flex-row justify-between items-center gap-4 pt-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 pl-2">
          {logoUrl ? (
            <img src={logoUrl || "/placeholder.svg"} alt={siteName} className="w-8 h-8 object-contain" />
          ) : (
            <PrayingHands size={32} />
          )}
          <span className="logo-font text-2xl sm:text-3xl md:text-4xl font-semibold">{siteName}</span>
        </Link>
        <div className="flex items-center gap-2 pr-2">
          <div className="flex items-center gap-1 bg-[#604d3e] p-1 rounded-lg">
            <button
              onClick={() => onFontSizeChange(false)}
              className="text-lg sm:text-xl font-medium px-3 py-1 hover:bg-[#705d4e] rounded transition-colors"
              aria-label="Diminuir tamanho da fonte"
            >
              A-
            </button>
            <div className="w-px h-6 bg-gray-600"></div>
            <button
              onClick={() => onFontSizeChange(true)}
              className="text-lg sm:text-xl font-medium px-3 py-1 hover:bg-[#705d4e] rounded transition-colors"
              aria-label="Aumentar tamanho da fonte"
            >
              A+
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

