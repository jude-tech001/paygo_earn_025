"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function BuyPayIdPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("paygo-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    const user = JSON.parse(storedUser)
    setUserData(user)

    // Pre-fill email if available
    if (user.email) {
      setEmail(user.email)
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName || !email) {
      alert("Please fill in all fields")
      return
    }

    // Store form data in localStorage to use on the next page
    localStorage.setItem(
      "paygo-pay-id-form",
      JSON.stringify({
        fullName,
        email,
      }),
    )

    // Navigate to loading page
    router.push("/buy-pay-id/loading")
  }

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - Matching the screenshot exactly */}
      <div className="bg-[#2e1065] text-white p-4">
        <h1 className="text-xl font-bold">Buy PAY ID</h1>
      </div>

      {/* Form - Matching the screenshot exactly */}
      <div className="p-4 flex-1">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-gray-700 font-medium">
              Amount
            </label>
            <Input id="amount" value="₦7,250" disabled className="bg-gray-100 h-12" />
          </div>

          <div className="space-y-2">
            <label htmlFor="fullName" className="text-gray-700 font-medium">
              Full Name
            </label>
            <Input
              id="fullName"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Your Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
          </div>

          <Button type="submit" className="w-full bg-[#9333EA] hover:bg-purple-700 text-white h-14 mt-4">
            Pay
          </Button>

          <p className="text-center text-gray-500 mt-4">
            Your PAY ID will be displayed on the app once your payment is confirmed.
          </p>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 text-center">
        <p className="text-gray-700 font-medium">PayGo Financial Services LTD</p>
      </div>
    </div>
  )
}
