"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GroupsPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("paygo-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUserData(JSON.parse(storedUser))
  }, [router])

  const handleJoinWhatsApp = () => {
    window.open("https://whatsapp.com/channel/0029VakAHcnEKyZFc7Mc9V06", "_blank")
  }

  const handleJoinTelegram = () => {
    window.open("https://t.me/rexnaijaupdate")
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
          <span className="font-medium">Join Our Communities</span>
        </Link>
      </div>

      <div className="p-4 space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-purple-800 mb-2">Connect With Us</h2>
          <p className="text-gray-600 text-sm">Join our official channels for updates and support</p>
        </div>

        {/* WhatsApp Channel */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">WhatsApp Channel</h3>
            </div>
          </div>
          <Button
            onClick={handleJoinWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2 rounded-full"
          >
            <MessageCircle className="h-5 w-5" />
            Join WhatsApp
          </Button>
        </div>

        {/* Telegram Channel */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Send className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Telegram Channel</h3>
            </div>
          </div>
          <Button
            onClick={handleJoinTelegram}
            className="w-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center gap-2 rounded-full"
          >
            <Send className="h-5 w-5" />
            Join Telegram
          </Button>
        </div>
      </div>
    </div>
  )
}
