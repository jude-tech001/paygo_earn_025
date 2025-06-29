"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronDown, AlertCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// List of Nigerian banks
const NIGERIAN_BANKS = [
  "Access Bank",
  "Citibank Nigeria",
  "Ecobank Nigeria",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank",
  "Guaranty Trust Bank",
  "Heritage Bank",
  "Keystone Bank",
  "Polaris Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
  "Jaiz Bank",
  "Providus Bank",
  "Titan Trust Bank",
  "Globus Bank",
  "SunTrust Bank",
  "Parallex Bank",
  "Premium Trust Bank",
  "Optimus Bank",
  "PalmPay",
  "Kuda Bank",
  "VFD Microfinance Bank",
  "Moniepoint Microfinance Bank",
  "Opay Digital Services",
  "Palmpay",
  "Rubies Microfinance Bank",
  "Sparkle Microfinance Bank",
  "TAJ Bank",
  "TCF Microfinance Bank",
  "Titan Trust Bank",
  "VFD Microfinance Bank",
  "Zenith Bank",
  "Abbey Mortgage Bank",
  "Above Only Microfinance Bank",
  "Accion Microfinance Bank",
  "Ahmadu Bello University Microfinance Bank",
  "Airtel Smartcash PSB",
  "Alphakapital Microfinance Bank",
  "Amju Unique Microfinance Bank",
  "CEMCS Microfinance Bank",
  "Coronation Merchant Bank",
  "Ekondo Microfinance Bank",
  "Eyowo",
  "Fairmoney Microfinance Bank",
  "Firmus Microfinance Bank",
  "FSDH Merchant Bank",
  "Gateway Mortgage Bank",
  "Goodnews Microfinance Bank",
  "Greenwich Merchant Bank",
  "Hackman Microfinance Bank",
  "Hasal Microfinance Bank",
  "HopePSB",
  "Ibile Microfinance Bank",
  "Infinity Microfinance Bank",
  "Lagos Building Investment Company",
  "Links Microfinance Bank",
  "Living Trust Mortgage Bank",
  "Lotus Bank",
  "Mayfair Microfinance Bank",
  "Mint Microfinance Bank",
  "MTN MOMO PSB",
  "NPF Microfinance Bank",
  "Paga",
  "Page Financials",
  "Parkway-ReadyCash",
  "PayCom",
]

// Function to validate PAY ID code
const validatePayIdCode = (code: string) => {
  // The correct PAY ID
  const CORRECT_PAY_ID = "PG-7474PAYDDT1I2PARFAGSGG"
  return code === CORRECT_PAY_ID
}

export default function WithdrawPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [accountName, setAccountName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [bank, setBank] = useState("Access Bank")
  const [amount, setAmount] = useState("")
  const [payId, setPayId] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("paygo-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUserData(JSON.parse(storedUser))
  }, [router])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace("NGN", "₦")
  }

  // Validate account number is 10 digits
  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "") // Remove non-digits
    if (value.length <= 10) {
      setAccountNumber(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsValidating(true)

    // Simulate API call to validate PAY ID code
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!validatePayIdCode(payId)) {
      setError("Invalid code. Please buy PAY ID code to continue.")
      setIsValidating(false)
      return
    }

    // Check if amount is valid
    const withdrawAmount = Number(amount)
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setError("Please enter a valid amount.")
      setIsValidating(false)
      return
    }

    // Check if amount is less than or equal to balance
    if (withdrawAmount > userData.balance) {
      setError("Insufficient balance.")
      setIsValidating(false)
      return
    }

    // Store withdrawal data in localStorage for the loading page
    localStorage.setItem(
      "paygo-withdrawal-data",
      JSON.stringify({
        accountName,
        accountNumber,
        bank,
        amount: withdrawAmount,
      }),
    )

    // Proceed to loading page
    setIsValidating(false)
    router.push("/withdraw/loading")
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
          <span className="font-medium text-xl">Transfer To Bank</span>
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 flex-1">
        <h2 className="text-2xl font-bold mb-4">Bank Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="Account Number (10 digits)"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {accountNumber.length > 0 && accountNumber.length < 10 && (
              <p className="text-xs text-red-500 mt-1">Account number must be 10 digits</p>
            )}
          </div>

          <div className="relative">
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none bg-gray-50"
            >
              {NIGERIAN_BANKS.map((bankName) => (
                <option key={bankName} value={bankName}>
                  {bankName}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-purple-600" />
          </div>

          <div>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="PAY ID CODE (Buy PAY ID)"
              value={payId}
              onChange={(e) => setPayId(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <div className="mt-1">
              <Link href="/buy-pay-id" className="text-purple-600 text-sm hover:underline">
                Buy PAY ID code
              </Link>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="py-2">
            <p className="text-lg font-medium">Available Balance: {formatCurrency(userData.balance)}</p>
          </div>

          <Button
            type="submit"
            className="w-full py-6 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors flex items-center justify-center"
            disabled={isValidating}
          >
            {isValidating ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Validating...</span>
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
