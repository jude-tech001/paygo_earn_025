"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PaymentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)
  const [copiedAmount, setCopiedAmount] = useState(false)
  const [copiedAccount, setCopiedAccount] = useState(false)
  const [showOpayWarning, setShowOpayWarning] = useState(false)

  useEffect(() => {
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
    navigator.clipboard.writeText("7250")
    setCopiedAmount(true)
    setTimeout(() => setCopiedAmount(false), 2000)
  }

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText("6936296932")
    setCopiedAccount(true)
    setTimeout(() => setCopiedAccount(false), 2000)
  }

  const handleConfirmPayment = () => {
    router.push("/buy-pay-id/confirming-payment")
  }

  const closeWarning = () => {
    localStorage.setItem("paygo-opay-warning-ack", "1")
    setShowOpayWarning(false)
  }

  if (!formData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {/* OPay Warning Modal */}
      {showOpayWarning && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn"
          aria-modal="true"
          role="dialog"
        >
          <div className="w-11/12 max-w-sm rounded-2xl bg-white p-6 shadow-xl transform animate-scaleUp">
            
            {/* Title */}
            <h2 className="mb-3 text-center text-lg font-extrabold text-[#1a237e]">
              Opay Service Down
            </h2>

            {/* Warning text */}
            <p className="mb-5 text-center text-sm text-gray-700 leading-relaxed">
              Please <span className="font-bold text-red-500">DO NOT</span> make your Pay ID payment using{" "}
              <span className="font-bold text-[#1a237e]">Opay Bank</span>. Payments from Opay may be delayed or rejected.
              Use any other bank for a smooth transaction.
            </p>

            <button
              onClick={closeWarning}
              className="w-full rounded-full bg-[#1a237e] py-2.5 text-center font-medium text-white hover:bg-[#0f175c] active:scale-[0.99] transition"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between bg-gray-300 p-4">
        <h1 className="text-lg font
