"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const LoanPaymentPage = () => {
  const [accountNumberCopied, setAccountNumberCopied] = useState(false)

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText("7742539748")
    setAccountNumberCopied(true)
    toast.success("Account number copied to clipboard!")

    setTimeout(() => {
      setAccountNumberCopied(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Loan Payment</CardTitle>
          <CardDescription>Make a payment towards your loan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Pay</Label>
              <Input id="amount" placeholder="Enter amount" type="number" />
            </div>
            <div className="space-y-2">
              <Label>Payment Information</Label>
              <div className="border rounded-md p-4">
                <p className="font-semibold">Account Details:</p>
                <p>
                  Account Number: <span className="font-medium">7742539748</span>
                  <Button variant="ghost" size="sm" onClick={handleCopyAccountNumber} disabled={accountNumberCopied}>
                    {accountNumberCopied ? "Copied!" : "Copy"}
                  </Button>
                </p>
                <p>
                  Bank Name: <span className="font-medium">Carbon</span>
                </p>
                <p>
                  Account Name: <span className="font-medium">PayGo-Ebuka Nwite</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Make Payment</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoanPaymentPage
