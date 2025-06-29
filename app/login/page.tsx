"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Get registered users from localStorage
    const registeredUsers = localStorage.getItem("paygo-registered-users")
    const users = registeredUsers ? JSON.parse(registeredUsers) : []

    // Check if user exists with matching email and password
    const user = users.find((u: any) => u.email === email && u.password === password)

    if (user) {
      // Set the logged in user
      localStorage.setItem(
        "paygo-user",
        JSON.stringify({
          name: user.name,
          email: user.email,
          balance: 180000,
          weeklyRewards: 180000,
          hasPayId: false,
        }),
      )

      setTimeout(() => {
        setLoading(false)
        router.push("/dashboard")
      }, 1000)
    } else {
      setTimeout(() => {
        setLoading(false)
        setError("Invalid email or password. Please try again.")
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f9f2f2]">
      <div className="absolute top-4 right-4">
        <Link href="/help" className="text-purple-600 font-medium">
          Need Help?
        </Link>
      </div>

      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <div className="animate-fade-in">
          <Logo className="w-64 mb-4" />
        </div>

        <h1 className="text-2xl font-semibold text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Login to continue
        </h1>

        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 animate-fade-in">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleLogin} className="w-full space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-14 rounded-full bg-white px-6 border border-gray-200"
            />

            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-14 rounded-full bg-white px-6 border border-gray-200"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 rounded-full bg-black hover:bg-gray-800 text-white text-lg"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-purple-600">
          <Link href="/register">Don&apos;t have an account? Register</Link>
        </p>
      </div>
    </div>
  )
}
