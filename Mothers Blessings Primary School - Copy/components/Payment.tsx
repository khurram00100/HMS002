"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Payment() {
  const [paymentType, setPaymentType] = useState("admission")
  const [amount, setAmount] = useState("")

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement payment logic here
    console.log(`Processing ${paymentType} payment of ${amount}`)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayment} className="space-y-4">
            <RadioGroup defaultValue="admission" onValueChange={setPaymentType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admission" id="admission" />
                <Label htmlFor="admission">Admission Fee</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly">Yearly Fee</Label>
              </div>
            </RadioGroup>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">
              Process Payment
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

