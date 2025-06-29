"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PayIdError } from "@/components/pay-id-error"

interface DataPlan {
  size: string
  price: number
  duration: string
}

export default function DataPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [payId, setPayId] = useState("")
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null)
  const [showPayIdError, setShowPayIdError] = useState(false)

  // The correct PAY ID
  const CORRECT_PAY_ID = "PG-7474PAYDDT1I2PARFAGSGG"

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("paygo-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUserData(JSON.parse(storedUser))
  }, [router])

  const networks = ["Airtel", "MTN", "Glo", "9mobile"]

  // Reduced data plans with smaller sizes and lower prices
  const dataPlans: DataPlan[] = [
    { size: "300MB", price: 100, duration: "1 DAY" },
    { size: "1GB", price: 300, duration: "7 DAYS" },
    { size: "3GB", price: 500, duration: "30 DAYS" },
    { size: "5GB", price: 800, duration: "30 DAYS" },
    { size: "10GB", price: 1500, duration: "30 DAYS" },
  ]

  const handleBuyData = () => {
    if (!selectedNetwork || !phoneNumber || !payId || !selectedPlan) {
      alert("Please fill all required fields")
      return
    }

    // Check if PAY ID is correct
    if (payId !== CORRECT_PAY_ID) {
      setShowPayIdError(true)
      return
    }

    // In a real app, you would send this data to a backend

    // Add transaction to history
    const storedTransactions = localStorage.getItem("paygo-transactions")
    const transactions = storedTransactions ? JSON.parse(storedTransactions) : []

    const newTransaction = {
      id: Date.now(),
      type: "debit",
      description: `Data Purchase - ${selectedNetwork} (${selectedPlan.size})`,
      amount: selectedPlan.price,
      date: new Date().toISOString(),
    }

    transactions.push(newTransaction)
    localStorage.setItem("paygo-transactions", JSON.stringify(transactions))

    // Update user balance
    const user = { ...userData }
    user.balance -= selectedPlan.price
    localStorage.setItem("paygo-user", JSON.stringify(user))

    alert("Data purchase successful!")
    router.push("/dashboard")
  }

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen pb-6 bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Data</span>
        </Link>
      </div>

      {/* Promo Banner */}
      <div className="bg-green-600 text-white p-4 flex items-center justify-between">
        <div>
          <span className="font-medium">Enjoy </span>
          <span className="text-yellow-300 font-bold">Glo&apos;s</span>
          <span className="font-medium"> Amazing 5X Data Bonuses!</span>
        </div>
        <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold px-6 py-1 h-8 rounded-full">
          GO
        </Button>
      </div>

      {/* Network Selection */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {networks.map((network) => (
          <button
            key={network}
            className={`p-3 rounded-lg border text-center ${
              selectedNetwork === network ? "border-green-600 bg-green-50" : "border-gray-200"
            }`}
            onClick={() => setSelectedNetwork(network)}
          >
            {network}
          </button>
        ))}
      </div>

      {/* Phone Number Input */}
      <div className="px-4 mb-4">
        <Input
          type="tel"
          placeholder="Enter mobile number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border rounded-lg p-3"
        />
      </div>

      {/* Data Plan Selection */}
      <div className="px-4 mb-4">
        <h3 className="font-medium mb-2">Select Data Plan</h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {dataPlans.map((plan, index) => (
            <button
              key={index}
              className={`p-3 rounded-lg border text-center ${
                selectedPlan?.size === plan.size ? "border-green-600 bg-green-50" : "border-gray-200"
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="font-bold">₦{plan.price}</div>
              <div className="text-xs text-gray-500">{plan.size}</div>
              <div className="text-xs text-gray-500">{plan.duration}</div>
            </button>
          ))}
        </div>
      </div>

      {/* PAY ID Input */}
      <div className="px-4 mt-6">
        <Input
          type="text"
          placeholder="Enter PAY ID Code"
          value={payId}
          onChange={(e) => setPayId(e.target.value)}
          className="border rounded-lg p-3 mb-4"
        />

        <Button
          onClick={handleBuyData}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-lg"
          disabled={!selectedPlan || !selectedNetwork || !phoneNumber || !payId}
        >
          Buy Data
        </Button>
      </div>

      {/* PAY ID Error Popup */}
      {showPayIdError && <PayIdError onClose={() => setShowPayIdError(false)} />}
    </div>
  )
}
