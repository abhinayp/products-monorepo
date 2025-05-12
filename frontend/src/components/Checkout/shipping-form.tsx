"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useCheckout } from "./CheckoutContext"

export default function ShippingForm() {
  const { shippingData, updateShippingData } = useCheckout()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
        <CardDescription>Enter your shipping details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="John"
              value={shippingData.firstName}
              onChange={(e) => updateShippingData({ firstName: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={shippingData.lastName}
              onChange={(e) => updateShippingData({ lastName: e.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={shippingData.email}
              onChange={(e) => updateShippingData({ email: e.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              placeholder="123 Main St"
              value={shippingData.address}
              onChange={(e) => updateShippingData({ address: e.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="addressLine2">Apartment, suite, etc. (optional)</Label>
            <Input
              id="addressLine2"
              placeholder="Apt 4B"
              value={shippingData.addressLine2}
              onChange={(e) => updateShippingData({ addressLine2: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="San Francisco"
              value={shippingData.city}
              onChange={(e) => updateShippingData({ city: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="state">State / Province</Label>
            <Select value={shippingData.state} onValueChange={(value) => updateShippingData({ state: value })}>
              <SelectTrigger id="state">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="tx">Texas</SelectItem>
                <SelectItem value="fl">Florida</SelectItem>
                <SelectItem value="il">Illinois</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="zipCode">ZIP / Postal Code</Label>
            <Input
              id="zipCode"
              placeholder="94103"
              value={shippingData.zipCode}
              onChange={(e) => updateShippingData({ zipCode: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Select value={shippingData.country} onValueChange={(value) => updateShippingData({ country: value })}>
              <SelectTrigger id="country">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="(123) 456-7890"
              value={shippingData.phone}
              onChange={(e) => updateShippingData({ phone: e.target.value })}
              required
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sameAsBilling"
              checked={shippingData.sameAsBilling}
              onCheckedChange={(checked) => updateShippingData({ sameAsBilling: checked as boolean })}
            />
            <Label htmlFor="sameAsBilling">Billing address is the same as shipping address</Label>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Shipping Method</h3>
            <RadioGroup
              value={shippingData.shippingMethod}
              onValueChange={(value) => updateShippingData({ shippingMethod: value as "standard" | "express" })}
            >
              <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">Standard Shipping (3-5 business days)</Label>
                </div>
                <span>$4.99</span>
              </div>
              <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express">Express Shipping (1-2 business days)</Label>
                </div>
                <span>$12.99</span>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
