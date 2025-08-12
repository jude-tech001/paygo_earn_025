"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PaymentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)
  const [copiedAmount, setCopiedAmount] = useState(false)
  const [copiedAccount, setCopiedAccount] = useState(false)
  const [showOpayWarning, setShowOpayWarning] = useState(false) // will be decided in useEffect

  useEffect(() => {
    // load form data
    const storedFormData = localStorage.getItem("paygo-pay-id-form")
    if (!storedFormData) {
      router.push("/buy-pay-id")
      return
    }
    setFormData(JSON.parse(storedFormData))

    // show the warning only if user hasn't acknowledged it yet
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          aria-modal="true"
          role="dialog"
        >
          <div className="w-11/12 max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            {/* Logo centered (served from /public) */}
            <div className="flex justify-center mb-3">
              {/* Make sure /public/paygo-logo.png exists. Add ?v=2 to bust caches if needed */}
              <img
                src="/paygo-logo.png?v=2"
                alt="PayGo Logo"
                className="h-14 w-14 object-contain"
                draggable={false}
              />
            </div>

            <h2 className="mb-2 text-center text-lg font-extrabold text-[#1a237e]">
              Important Payment Notice
            </h2>

            <p className="mb-5 text-center text-sm text-gray-700 leading-relaxed">
              Please <span className="font-bold text-red-500">DO NOT</span> make your Pay ID payment using{" "}
              <span className="font-bold text-[#1a237e]">Opay Bank</span>. Payments from Opay may be delayed or
              rejected. Use any other bank for a smooth transaction.
            </p>

            <button
              onClick={closeWarning}
              className="w-full rounded-full bg-orange-400 py-2.5 text-center font-medium text-black hover:bg-orange-500 active:scale-[0.99] transition"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between bg-gray-300 p-4">
        <h1 className="text-lg font-medium">Bank Transfer</h1>
        <Link href="/dashboard" className="text-red-500 font-medium">
          Cancel
        </Link>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a237e]">
            <div className="relative h-6 w-6">
              <div className="absolute inset-0 rounded-full border-2 border-orange-400"></div>
              <div className="absolute inset-1 rotate-45 rounded-full border-2 border-yellow-400"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">NGN 7,250</div>
            <div className="text-sm text-gray-600">{formData.email}</div>
          </div>
        </div>

        <p className="mb-4 text-center text-base">Complete this bank transfer to proceed</p>

        <div className="mb-4 overflow-hidden rounded-md border border-gray-300">
          <div className="space-y-4 bg-gray-100 p-3">
            <div>
              <p className="mb-1 text-sm text-gray-700">Amount</p>
              <div className="flex items-center justify-between">
                <p className="font-bold">NGN 7,250</p>
                <button
                  onClick={handleCopyAmount}
                  className="rounded bg-orange-400 px-3 py-1 text-sm text-white hover:bg-orange-500"
                >
                  {copiedAmount ?
