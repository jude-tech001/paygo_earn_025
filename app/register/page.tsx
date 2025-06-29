"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Get existing registered users
    const registeredUsers = localStorage.getItem("paygo-registered-users")
    const users = registeredUsers ? JSON.parse(registeredUsers) : []

    // Check if email already exists
    const emailExists = users.some((user: any) => user.email === email)

    if (emailExists) {
      setTimeout(() => {
        setLoading(false)
        setError("Email already registered. Please use a different email or login.")
      }, 1000)
      return
    }

    // Add new user to registered users
    users.push({ name, email, password })
    localStorage.setItem("paygo-registered-users", JSON.stringify(users))

    // Set the logged in user
    localStorage.setItem(
      "paygo-user",
      JSON.stringify({
        name,
        email,
        balance: 180000,
        weeklyRewards: 180000,
        hasPayId: false,
        level: "Basic", // Add default level
      }),
    )

    // Reset welcome popup flag to show it for the new user
    localStorage.removeItem("paygo-welcome-popup-shown")

    setTimeout(() => {
      setLoading(false)
      router.push("/welcome")
    }, 1000)
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
          Register to continue
        </h1>

        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 animate-fade-in">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleRegister} className="w-full space-y-6">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-14 rounded-full bg-white px-6 border border-gray-200"
            />

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
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-purple-600">
          <Link href="/login">Already have an account? Login</Link>
        </p>
      </div>
    </div>
  )
}
