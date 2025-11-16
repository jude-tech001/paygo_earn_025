"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { OpayWarningPopup } from "@/components/opay-warning-popup"

export default function PaymentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)
  const [copiedAmount, setCopiedAmount] = useState(false)
  const [copiedAccount, setCopiedAccount] = useState(false)
  const [showOpayWarning, setShowOpayWarning] = useState(true)

  useEffect(() => {
    // Check if form data exists
    const storedFormData = localStorage.getItem("paygo-pay-id-form")

    if (!storedFormData) {
      router.push("/buy-pay-id")
      return
    }

    setFormData(JSON.parse(storedFormData))
  }, [router])

  const handleCopyAmount = () => {
    navigator.clipboard.writeText("7,250")
    setCopiedAmount(true)
    setTimeout(() => setCopiedAmount(false), 2000)
  }

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText("0424631279")
    setCopiedAccount(true)
    setTimeout(() => setCopiedAccount(false), 2000)
  }

  const handleConfirmPayment = () => {
    // Redirect to the payment confirmation loading page
    router.push("/buy-pay-id/confirming-payment")
  }

  const handleCloseOpayWarning = () => {
    setShowOpayWarning(false)
  }

  if (!formData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-300 p-4">
        <h1 className="text-lg font-medium">Bank Transfer</h1>
        <Link href="/dashboard" className="text-red-500 font-medium">
          Cancel
        </Link>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="w-16 h-16 bg-[#1a237e] rounded-full flex items-center justify-center">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border-2 border-orange-400"></div>
              <div className="absolute inset-1 rounded-full border-2 border-yellow-400 transform rotate-45"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">NGN 7,250</div>
            <div className="text-gray-600">{formData.email}</div>
          </div>
        </div>

        <p className="text-center text-lg mb-6">Proceed to your bank app to complete this Transfer</p>

        <div className="border border-gray-300 rounded-md overflow-hidden mb-6">
          <div className="bg-gray-100 p-4 space-y-6">
            <div>
              <p className="text-gray-700 mb-1">Amount</p>
              <div className="flex items-center justify-between">
                <p className="font-bold">NGN 7,250</p>
                <button onClick={handleCopyAmount} className="bg-orange-400 text-white px-3 py-1 rounded text-sm">
                  {copiedAmount ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div>
              <p className="text-gray-700 mb-1">Account Number</p>
              <div className="flex items-center justify-between">
                <p className="font-bold">0424631279</p>
                <button
                  onClick={handleCopyAccountNumber}
                  className="bg-orange-400 text-white px-3 py-1 rounded text-sm"
                >
                  {copiedAccount ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div>
              <p className="text-gray-700 mb-1">Bank Name</p>
              <p className="font-bold">Wema Bank</p>
            </div>

            <div>
              <p className="text-gray-700 mb-1">Account Name</p>
              <p className="font-bold">Paygo-jude samuel</p>
            </div>
          </div>

          <div className="p-4 border-t border-gray-300">
            <p className="mb-4">
              Make Payment to the Account Above to get your PAY ID and don't use Opay bank for PAYment
            </p>

            <button
              onClick={handleConfirmPayment}
              className="w-full bg-orange-400 hover:bg-orange-500 text-black py-3 font-medium"
            >
              I have made this bank Transfer
            </button>
          </div>
        </div>
      </div>

      {/* Opay Warning Popup */}
      {showOpayWarning && <OpayWarningPopup onClose={handleCloseOpayWarning} />}
    </div>
  )
}
