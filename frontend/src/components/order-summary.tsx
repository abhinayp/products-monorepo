"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

// Mock data for the order
const orderItems = [
  {
    id: 1,
    name: "Minimalist Watch",
    price: 129.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Leather Wallet",
    price: 59.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function OrderSummary() {
  const [isOpen, setIsOpen] = useState(true)
  const [promoCode, setPromoCode] = useState("")

  const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 4.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <Card className="sticky top-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Order Summary</CardTitle>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Button>
      </CardHeader>

      <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <CardContent className="space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-md">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <div className="font-medium">${item.price.toFixed(2)}</div>
            </div>
          ))}

          <Separator />

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="flex gap-2">
            <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
            <Button variant="outline">Apply</Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
