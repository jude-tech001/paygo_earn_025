"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, MessageSquare, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LiveChat } from "@/components/live-chat"

export default function SupportPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [showLiveChat, setShowLiveChat] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("paygo-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUserData(JSON.parse(storedUser))
  }, [router])

  const handleWhatsAppSupport = () => {
    // Create WhatsApp URL with phone number and pre-filled message
    const phoneNumber = "2349132579513" // Remove the + as it's added in the URL format
    const message = encodeURIComponent("hello i contacted for help from Paygo app")
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")
  }

  const handleLiveChat = () => {
    setShowLiveChat(true)
  }

  const handleCloseLiveChat = () => {
    setShowLiveChat(false)
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
          <span className="font-medium">Support</span>
        </Link>
      </div>

      <div className="p-4 space-y-6">
        <h2 className="text-xl font-semibold">How can we help you?</h2>

        {/* Live Chat Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-purple-600" />
              Live Chat
            </CardTitle>
            <CardDescription>Chat with our support team directly in the app</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleLiveChat}
              className="w-full bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Start Live Chat
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Our support agents are available to assist you with any questions or issues.
            </p>
          </CardContent>
        </Card>

        {/* WhatsApp Support Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              WhatsApp Support
            </CardTitle>
            <CardDescription>Chat with our support team on WhatsApp for quick assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleWhatsAppSupport}
              className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Chat on WhatsApp
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Our support team is available 24/7 to assist you with any issues or questions.
            </p>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500 mt-6">
          {" "}
          Financial Services
          <br />
          PayGo © 2023. All rights reserved.
        </div>
      </div>

      {/* Live Chat Popup */}
      {showLiveChat && <LiveChat onClose={handleCloseLiveChat} />}
    </div>
  )
}
