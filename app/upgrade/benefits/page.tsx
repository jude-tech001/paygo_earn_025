"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check, Shield, Zap, Award, Crown, Diamond, Star, Gem } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Level {
  id: string
  name: string
  price: number
  icon: React.ElementType
  color: string
  bgColor: string
  borderColor: string
  benefits: string[]
}

export default function LevelBenefitsPage() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState<any>(null)

  useEffect(() => {
    // Get selected level from localStorage
    const storedLevel = localStorage.getItem("paygo-selected-level")

    if (!storedLevel) {
      router.push("/upgrade")
      return
    }

    setSelectedLevel(JSON.parse(storedLevel))
  }, [router])

  const levels: Record<string, Level> = {
    silver: {
      id: "silver",
      name: "Silver Level",
      price: 5500,
      icon: Shield,
      color: "text-gray-700",
      bgColor: "bg-gradient-to-br from-gray-100 to-gray-300",
      borderColor: "border-gray-300",
      benefits: [
        "Earn ��500 per referral",
        "Weekly rewards of ₦5,000",
        "Basic customer support",
        "Access to standard features",
      ],
    },
    gold: {
      id: "gold",
      name: "Gold Level",
      price: 7500,
      icon: Award,
      color: "text-yellow-700",
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-200",
      borderColor: "border-yellow-300",
      benefits: [
        "Earn ₦1,000 per referral",
        "Weekly rewards of ₦10,000",
        "Priority customer support",
        "Reduced fees on transactions",
        "Twice weekly withdrawal option",
      ],
    },
    platinum: {
      id: "platinum",
      name: "Platinum Level",
      price: 10000,
      icon: Zap,
      color: "text-blue-700",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-200",
      borderColor: "border-blue-300",
      benefits: [
        "Earn ₦2,000 per referral",
        "Weekly rewards of ₦20,000",
        "VIP customer support",
        "No fees on transactions",
        "Exclusive promotions",
        "Daily withdrawal option",
      ],
    },
    emerald: {
      id: "emerald",
      name: "Emerald Level",
      price: 15000,
      icon: Gem,
      color: "text-green-700",
      bgColor: "bg-gradient-to-br from-green-50 to-green-200",
      borderColor: "border-green-300",
      benefits: [
        "Earn ₦3,000 per referral",
        "Weekly rewards of ₦30,000",
        "Premium customer support",
        "No fees on transactions",
        "Exclusive promotions",
        "10% bonus on all earnings",
      ],
    },
    ruby: {
      id: "ruby",
      name: "Ruby Level",
      price: 20000,
      icon: Star,
      color: "text-red-700",
      bgColor: "bg-gradient-to-br from-red-50 to-red-200",
      borderColor: "border-red-300",
      benefits: [
        "Earn ₦4,000 per referral",
        "Weekly rewards of ₦40,000",
        "Premium customer support",
        "No fees on transactions",
        "15% bonus on all earnings",
        "Exclusive investment opportunities",
      ],
    },
    diamond: {
      id: "diamond",
      name: "Diamond Level",
      price: 25000,
      icon: Crown,
      color: "text-purple-700",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-200",
      borderColor: "border-purple-300",
      benefits: [
        "Earn ₦5,000 per referral",
        "Weekly rewards of ₦50,000",
        "24/7 dedicated support",
        "No fees on transactions",
        "Higher withdrawal limits",
        "Early access to new features",
      ],
    },
    black: {
      id: "black",
      name: "Black Elite Level",
      price: 50000,
      icon: Diamond,
      color: "text-white",
      bgColor: "bg-gradient-to-br from-gray-800 to-black",
      borderColor: "border-gray-700",
      benefits: [
        "Earn ₦10,000 per referral",
        "Weekly rewards of ₦100,000",
        "Personal account manager",
        "No fees on transactions",
        "Unlimited withdrawal limits",
        "25% bonus on all earnings",
        "Exclusive offline events access",
      ],
    },
  }

  const handleProceedToPayment = () => {
    // Store upgrade data in localStorage
    localStorage.setItem(
      "paygo-upgrade-data",
      JSON.stringify({
        level: selectedLevel.id,
        price: selectedLevel.price,
        name: selectedLevel.name,
      }),
    )

    // Navigate to loading page first
    router.push("/upgrade/loading")
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

  if (!selectedLevel) {
    return <div className="p-6 text-center">Loading...</div>
  }

  const levelData = levels[selectedLevel.id]
  const Icon = levelData.icon

  return (
    <div className="min-h-screen pb-6 bg-white">
      {/* Header */}
      <div className="flex items-center p-4 bg-purple-600 text-white">
        <Link href="/upgrade" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium text-xl">Level Benefits</span>
        </Link>
      </div>

      <div className="p-4 space-y-4">
        {/* Level Header */}
        <div className={cn("p-4 rounded-lg", levelData.bgColor)}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Icon className={cn("h-6 w-6", levelData.color)} />
            </div>
            <div>
              <h2 className="text-lg font-bold">{levelData.name}</h2>
              <p className="font-medium">{formatCurrency(levelData.price)}</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-3 bg-purple-50 border-b border-gray-200">
            <h3 className="font-bold text-sm text-purple-800">Benefits & Features</h3>
          </div>
          <div className="p-3">
            <ul className="space-y-2">
              {levelData.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className={cn("h-4 w-4 shrink-0 mt-0.5", levelData.color)} />
                  <span className="text-gray-800">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button
          onClick={handleProceedToPayment}
          className={cn(
            "w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl",
            "transition-all duration-300 ease-in-out",
            "hover:shadow-lg active:scale-[0.98]",
          )}
        >
          Proceed to Payment
        </Button>

        <p className="text-center text-xs text-gray-500">
          Your upgrade will be activated immediately after payment is confirmed
        </p>
      </div>
    </div>
  )
}
