"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import OrderDetails from "./OrderDetails"
export default function OrderSummary() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Card className="sticky top-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Order Summary</CardTitle>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Button>
      </CardHeader>

      <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <OrderDetails />
      </div>
    </Card>
  )
}
