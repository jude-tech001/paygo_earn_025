"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationManager } from "@/components/notification-manager"
import { PromoCarousel } from "@/components/promo-carousel"
import { WelcomePopup } from "@/components/welcome-popup"
import { ReferralPopup } from "@/components/referral-popup"

interface UserData {
  name: string
  email: string
  balance: number
  weeklyRewards: number
  hasPayId: boolean
  profilePicture?: string
}

interface MenuItem {
  name: string
  icon?: React.ElementType
  emoji?: string
  link?: string
  external?: boolean
  action?: () => void
  color: string
  bgColor: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const [showReferralPopup, setShowReferralPopup] = useState(false)
  const [showBalance, setShowBalance] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("paygo-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    const user = JSON.parse(storedUser)
    setUserData(user)

    // Check if welcome popup has been shown
    const welcomePopupShown = localStorage.getItem("paygo-welcome-popup-shown")
    if (!welcomePopupShown) {
      setShowWelcomePopup(true)
    } else {
      // Always show referral popup for existing users after a short delay
      setTimeout(() => {
        setShowReferralPopup(true)
      }, 2000)
    }
  }, [router])

  const handleCloseWelcomePopup = useCallback(() => {
    setShowWelcomePopup(false)
    // Set flag in localStorage to not show welcome popup again
    localStorage.setItem("paygo-welcome-popup-shown", "true")

    // Show referral popup after welcome popup is closed
    setTimeout(() => {
      setShowReferralPopup(true)
    }, 1000)
  }, [])

  const handleCloseReferralPopup = useCallback(() => {
    setShowReferralPopup(false)
    // No longer storing any flag - popup will show every time
  }, [])

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  const formatCurrency = (amount: number) => {
    if (!showBalance) return "••••••••"

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace("NGN", "₦")
  }

  // Dashboard menu items with emojis and icons
  const menuItems: MenuItem[] = [
    { name: "Buy PAY ID", icon: CreditCard, link: "/buy-pay-id", color: "text-purple-600", bgColor: "" },
    { name: "Watch", emoji: "📺", link: "/watch", color: "text-red-600", bgColor: "" },
    { name: "Airtime", emoji: "📶", link: "/airtime", color: "text-green-600", bgColor: "" },
    { name: "Data", emoji: "🛢️", link: "/data", color: "text-cyan-600", bgColor: "" },
    { name: "Support", emoji: "🎧", link: "/support", color: "text-teal-600", bgColor: "" },
    { name: "Group", emoji: "🌐", link: "/groups", color: "text-pink-600", bgColor: "" },
    { name: "Earn More", emoji: "💰", link: "/earn-more", color: "text-yellow-600", bgColor: "" },
    { name: "Profile", emoji: "👤", link: "/profile", color: "text-violet-600", bgColor: "" },
  ]

  return (
    <div className="min-h-screen pb-4 bg-gradient-to-b from-[#f9f2f2] to-[#f5f0ff]">
      {/* Notification Manager - invisible component that handles notifications */}
      <NotificationManager />

      {/* Welcome Popup */}
      {showWelcomePopup && userData && (
        <WelcomePopup userName={userData.name.split(" ")[0]} onClose={handleCloseWelcomePopup} />
      )}

      {/* Referral Popup - Shows every time user opens the app */}
      {showReferralPopup && <ReferralPopup onClose={handleCloseReferralPopup} />}

      {/* Scrolling notification header */}
      <div className="bg-white text-red-600 text-xs py-3 px-4 shadow-sm w-full">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block font-bold">
            Dear User, We're currently experiencing issues with Opay bank transfers. Please use other banks for your
            payments. &nbsp;&nbsp;&nbsp; Dear User, We're currently experiencing issues with Opay bank transfers. Please
            use other banks for your payments.
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-purple-700 text-white rounded-xl p-5 shadow-lg mx-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden">
              {userData.profilePicture ? (
                <img
                  src={userData.profilePicture || "/placeholder.svg"}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-semibold text-xl text-purple-700">{userData.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <div className="font-medium text-lg">
                Hi, {userData.name.split(" ")[0]} <span className="ml-1">👋</span>
              </div>
              <div className="text-sm text-gray-200">Welcome back!</div>
            </div>
          </div>
          <Link href="/history">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-full bg-purple-600 hover:bg-purple-500"
            >
              <span className="text-lg">🔔</span>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </Link>
        </div>

        <div className="mt-4">
          <div className="text-sm font-medium text-gray-200 mb-1">Your Balance</div>
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold">{formatCurrency(userData.balance)}</div>
            <button
              className="text-gray-200 hover:text-white transition-colors"
              onClick={() => setShowBalance(!showBalance)}
              aria-label="Toggle balance visibility"
            >
              {showBalance ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="2" y1="21" x2="22" y2="3" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          <div className="text-sm text-purple-200 mt-1">
            <span className="font-medium">Weekly Rewards:</span>{" "}
            {showBalance ? formatCurrency(userData.weeklyRewards) : "••••••••"}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Link href="/upgrade" className="flex-1 mr-2">
            <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white rounded-full py-3 h-auto flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6b21a8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                  <path d="M16 6h4v4" />
                </svg>
              </div>
              <span>Upgrade</span>
            </Button>
          </Link>
          <Link href="/withdraw" className="flex-1 ml-2">
            <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white rounded-full py-3 h-auto flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6b21a8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19V5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </div>
              <span>Transfer</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Action Buttons Grid with enhanced styling */}
      <div className="grid grid-cols-4 gap-1 p-2 mt-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon

          if (item.action) {
            return (
              <button key={index} onClick={item.action} className="focus:outline-none">
                <div className="flex flex-col items-center justify-center p-1 transition-all duration-300 transform hover:-translate-y-1">
                  <div
                    className={`w-10 h-10 flex items-center justify-center mb-1 ${item.color} drop-shadow-md animate-pulse-slow rounded-lg`}
                  >
                    {item.emoji ? (
                      <span className="text-2xl">{item.emoji}</span>
                    ) : (
                      Icon && <Icon size={22} strokeWidth={1.5} className="animate-fade-in" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-center text-gray-700">{item.name}</span>
                </div>
              </button>
            )
          }

          if (item.external) {
            return (
              <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
                <div className="flex flex-col items-center justify-center p-1 transition-all duration-300 transform hover:-translate-y-1">
                  <div
                    className={`w-10 h-10 flex items-center justify-center mb-1 ${item.color} drop-shadow-md animate-pulse-slow rounded-lg`}
                  >
                    {item.emoji ? (
                      <span className="text-2xl">{item.emoji}</span>
                    ) : (
                      Icon && <Icon size={22} strokeWidth={1.5} className="animate-fade-in" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-center text-gray-700">{item.name}</span>
                </div>
              </a>
            )
          }

          return (
            <Link key={index} href={item.link || "#"} className="focus:outline-none">
              <div className="flex flex-col items-center justify-center p-1 transition-all duration-300 transform hover:-translate-y-1">
                <div
                  className={`w-10 h-10 flex items-center justify-center mb-1 ${item.color} drop-shadow-md animate-pulse-slow rounded-lg`}
                >
                  {item.emoji ? (
                    <span className="text-2xl">{item.emoji}</span>
                  ) : (
                    Icon && <Icon size={22} strokeWidth={1.5} className="animate-fade-in" />
                  )}
                </div>
                <span className="text-xs font-medium text-center text-gray-700">{item.name}</span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Promotional Carousel */}
      <div className="mx-4 mt-4 mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Current Promotions</h2>
        <PromoCarousel className="animate-fade-in" />
      </div>
    </div>
  )
}
