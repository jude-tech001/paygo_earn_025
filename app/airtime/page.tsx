"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PayIdError } from "@/components/pay-id-error"

export default function AirtimePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [payId, setPayId] = useState("")
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
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

  const airtimeAmounts = [
    { amount: 50, cashback: 1 },
    { amount: 100, cashback: 2 },
    { amount: 200, cashback: 3 },
    { amount: 500, cashback: 10 },
    { amount: 1000, cashback: 20 },
    { amount: 2000, cashback: 50 },
    { amount: 3000, cashback: 75 },
    { amount: 5000, cashback: 125 },
    { amount: 10000, cashback: 250 },
  ]

  const handleBuyAirtime = () => {
    if (!selectedNetwork || !phoneNumber || !payId || !selectedAmount) {
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
      description: `Airtime Purchase - ${selectedNetwork}`,
      amount: selectedAmount,
      date: new Date().toISOString(),
    }

    transactions.push(newTransaction)
    localStorage.setItem("paygo-transactions", JSON.stringify(transactions))

    // Update user balance
    const user = { ...userData }
    user.balance -= selectedAmount
    localStorage.setItem("paygo-user", JSON.stringify(user))

    alert("Airtime purchase successful!")
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
          <span className="font-medium">Airtime</span>
        </Link>
      </div>

      {/* Promo Banner */}
      <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
        <div>
          <span className="font-medium">Enjoy </span>
          <span className="text-yellow-300 font-bold">Airtime Bonuses!</span>
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
              selectedNetwork === network ? "border-purple-600 bg-purple-50" : "border-gray-200"
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

      {/* Amount Selection */}
      <div className="px-4 mb-4">
        <h3 className="font-medium mb-2">Select Amount</h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {airtimeAmounts.map((option) => (
            <button
              key={option.amount}
              className={`p-3 rounded-lg border text-center ${
                selectedAmount === option.amount ? "border-purple-600 bg-purple-50" : "border-gray-200"
              }`}
              onClick={() => setSelectedAmount(option.amount)}
            >
              <div className="font-bold">₦{option.amount}</div>
              <div className="text-xs text-gray-500">₦{option.cashback} Cashback</div>
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
          onClick={handleBuyAirtime}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-lg"
          disabled={!selectedAmount || !selectedNetwork || !phoneNumber || !payId}
        >
          Buy Airtime
        </Button>
      </div>

      {/* PAY ID Error Popup */}
      {showPayIdError && <PayIdError onClose={() => setShowPayIdError(false)} />}
    </div>
  )
}
