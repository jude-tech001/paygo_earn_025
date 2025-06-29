"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Shield, Zap, Award, Crown, Diamond, Star, Gem } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Level {
  id: string
  name: string
  shortName: string
  price: number
  icon: React.ElementType
  color: string
  bgColor: string
  borderColor: string
}

export default function UpgradePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [selectedLevel, setSelectedLevel] = useState<string>("silver")

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("paygo-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUserData(JSON.parse(storedUser))
  }, [router])

  const levels: Level[] = [
    {
      id: "silver",
      name: "Silver Level",
      shortName: "Silver",
      price: 5500,
      icon: Shield,
      color: "text-gray-700",
      bgColor: "bg-gradient-to-br from-gray-100 to-gray-300",
      borderColor: "border-gray-300",
    },
    {
      id: "gold",
      name: "Gold Level",
      shortName: "Gold",
      price: 7500,
      icon: Award,
      color: "text-yellow-700",
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-200",
      borderColor: "border-yellow-300",
    },
    {
      id: "platinum",
      name: "Platinum Level",
      shortName: "Platinum",
      price: 10000,
      icon: Zap,
      color: "text-blue-700",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-200",
      borderColor: "border-blue-300",
    },
    {
      id: "emerald",
      name: "Emerald Level",
      shortName: "Emerald",
      price: 15000,
      icon: Gem,
      color: "text-green-700",
      bgColor: "bg-gradient-to-br from-green-50 to-green-200",
      borderColor: "border-green-300",
    },
    {
      id: "ruby",
      name: "Ruby Level",
      shortName: "Ruby",
      price: 20000,
      icon: Star,
      color: "text-red-700",
      bgColor: "bg-gradient-to-br from-red-50 to-red-200",
      borderColor: "border-red-300",
    },
    {
      id: "diamond",
      name: "Diamond Level",
      shortName: "Diamond",
      price: 25000,
      icon: Crown,
      color: "text-purple-700",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-200",
      borderColor: "border-purple-300",
    },
    {
      id: "black",
      name: "Black Elite Level",
      shortName: "Black",
      price: 50000,
      icon: Diamond,
      color: "text-white",
      bgColor: "bg-gradient-to-br from-gray-800 to-black",
      borderColor: "border-gray-700",
    },
  ]

  const handleViewBenefits = () => {
    // Store selected level in localStorage
    localStorage.setItem(
      "paygo-selected-level",
      JSON.stringify({
        id: selectedLevel,
        name: levels.find((level) => level.id === selectedLevel)?.name,
        price: levels.find((level) => level.id === selectedLevel)?.price,
      }),
    )

    // Navigate to benefits page
    router.push("/upgrade/benefits")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("NGN", "₦")
  }

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen pb-6 bg-white">
      {/* Header */}
      <div className="flex items-center p-4 bg-purple-600 text-white">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium text-xl">Upgrade Account</span>
        </Link>
      </div>

      <div className="p-4 space-y-5">
        <div className="text-center mb-2">
          <h2 className="text-xl font-bold text-gray-800">Choose Your Level</h2>
          <p className="text-gray-600 text-xs mt-1">Select a level to view benefits and upgrade</p>
        </div>

        {/* Current Level */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Award className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Current Level</p>
              <p className="font-medium text-sm">{userData.level || "Basic"}</p>
            </div>
          </div>
        </div>

        {/* Visual Level Selection - Smaller Cards */}
        <div>
          <h3 className="text-gray-700 font-medium text-sm mb-2">Select Level to Upgrade</h3>

          {/* Level Cards - Grid Layout */}
          <div className="grid grid-cols-3 gap-2">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={cn(
                  "relative overflow-hidden transition-all duration-300 ease-in-out",
                  "border rounded-lg p-2",
                  "flex flex-col items-center justify-center text-center",
                  "hover:shadow-sm active:scale-[0.98]",
                  selectedLevel === level.id
                    ? `${level.borderColor} ${level.bgColor} shadow-sm`
                    : "border-gray-200 bg-white",
                )}
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center mb-1",
                    selectedLevel === level.id ? level.bgColor : "bg-gray-100",
                  )}
                >
                  <level.icon
                    className={cn("h-3.5 w-3.5", selectedLevel === level.id ? level.color : "text-gray-500")}
                  />
                </div>
                <h4 className="font-bold text-xs">{level.shortName}</h4>
                <p className={cn("font-medium text-xs", selectedLevel === level.id ? level.color : "text-gray-600")}>
                  {formatCurrency(level.price)}
                </p>

                {/* Selection indicator */}
                {selectedLevel === level.id && (
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-r-[12px] border-t-transparent border-r-purple-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleViewBenefits}
          className={cn(
            "w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl mt-3",
            "transition-all duration-300 ease-in-out",
            "hover:shadow-lg active:scale-[0.98]",
          )}
        >
          View Benefits
        </Button>

        <p className="text-center text-xs text-gray-500">Select a level to view detailed benefits before payment</p>
      </div>
    </div>
  )
}
