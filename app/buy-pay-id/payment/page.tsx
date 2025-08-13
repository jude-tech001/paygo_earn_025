"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)
  const [copiedAmount, setCopiedAmount] = useState(false)
  const [copiedAccount, setCopiedAccount] = useState(false)
  const [showOpayWarning, setShowOpayWarning] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true) // Ensure we're on client side

    const storedFormData = localStorage.getItem("paygo-pay-id-form")
    if (!storedFormData) {
      router.push("/buy-pay-id")
      return
    }
    setFormData(JSON.parse(storedFormData))

    const acknowledged = localStorage.getItem("paygo-opay-warning-ack") === "1"
    setShowOpayWarning(!acknowledged)
  }, [router])

  const handleCopyAmount = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText("7250")
      setCopiedAmount(true)
      setTimeout(() => setCopiedAmount(false), 2000)
    }
  }

  const handleCopyAccountNumber = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText("6936296932")
      setCopiedAccount(true)
      setTimeout(() => setCopiedAccount(false), 2000)
    }
  }

  const handleConfirmPayment = () => {
    router.push("/buy-pay-id/confirming-payment")
  }

  const closeWarning = () => {
    localStorage.setItem("paygo-opay-warning-ack", "1")
    setShowOpayWarning(false)
  }

  if (!isClient) return null

  if (!formData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {/* OPay Warning Modal */}
      {showOpayWarning && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          aria-modal="true"
          role="dialog"
        >
          <div className="w-11/12 max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-3 text-center text-lg font-extrabold text-[#1a237e]">
              Opay Service Down
            </h2>
            <p className="mb-5 text-center text-sm text-gray-700 leading-relaxed">
              Please <span className="font-bold text-red-500">DO NOT</span> make your Pay ID payment using{" "}
              <span className="font-bold text-[#1a237e]">Opay Bank</span>. Payments from Opay may be delayed or rejected.
              Use any other bank for a smooth transaction.
            </p>
            <button
              onClick={closeWarning}
              className="w-full rounded-full bg-[#1a237e] py-2.5 text-center font-medium text-white"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      {/* Original Payment Page Layout */}
      <div className="flex-1 p-6">
        <div className="mb-4">
          <p className="font-semibold">Amount:</p>
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-green-600">₦7,250</span>
            <button
              onClick={handleCopyAmount}
              className="px-3 py-1 text-sm bg-gray-200 rounded"
            >
              {copiedAmount ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-semibold">Account Number:</p>
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium">6936296932</span>
            <button
              onClick={handleCopyAccountNumber}
              className="px-3 py-1 text-sm bg-gray-200 rounded"
            >
              {copiedAccount ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-sm text-gray-500">Bank: Paygo Bank</p>
        </div>

        <button
          onClick={handleConfirmPayment}
          className="w-full py-3 mt-6 rounded-lg bg-green-600 text-white font-semibold"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  )
}
