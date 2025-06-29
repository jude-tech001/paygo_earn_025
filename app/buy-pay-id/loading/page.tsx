"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function LoadingPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if form data exists
    const formData = localStorage.getItem("paygo-pay-id-form")

    if (!formData) {
      router.push("/buy-pay-id")
      return
    }

    // Redirect to payment page after 7 seconds
    const timer = setTimeout(() => {
      router.push("/buy-pay-id/payment")
    }, 7000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-[#2e1065] text-white p-4">
        <h1 className="text-xl font-bold">Buy PAY ID</h1>
      </div>

      {/* Loading Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="animate-spin mb-6">
          <Loader2 className="h-16 w-16 text-purple-600" />
        </div>

        <h2 className="text-xl font-semibold text-center mb-2">Preparing Payment Account</h2>
        <p className="text-gray-500 text-center">Please wait while we set up your payment...</p>

        <div className="w-full max-w-md mt-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 animate-progress"
              style={{
                animation: "progress 7s linear forwards",
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 text-center">
        <p className="text-gray-700 font-medium">PayGo Financial Services LTD</p>
      </div>
    </div>
  )
}
