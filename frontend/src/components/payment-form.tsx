"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, CreditCard, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShippingForm from "@/components/shipping-form"

export default function PaymentForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate payment processing
    setTimeout(() => {
      router.push("/checkout/confirmation")
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        <ShippingForm />

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Select your preferred payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="card">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="card">Credit Card</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="apple">Apple Pay</TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input id="nameOnCard" placeholder="John Doe" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroup defaultValue="save" className="flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="save" id="save" />
                      <Label htmlFor="save">Save card for future purchases</Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="paypal" className="pt-4">
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    You will be redirected to PayPal to complete your payment
                  </p>
                  <Button type="button" className="w-full">
                    Continue to PayPal
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="apple" className="pt-4">
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Complete your purchase with Apple Pay</p>
                  <Button type="button" variant="outline" className="w-full">
                    Pay with Apple Pay
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review & Place Order</CardTitle>
            <CardDescription>Please review your order before completing your purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Your order details have been confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Your shipping information is valid</span>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">
                By clicking "Place Order", you agree to our Terms of Service and Privacy Policy. You will be charged the
                total amount shown in the order summary.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Place Order
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
