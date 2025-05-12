"use client"
import React from 'react'
import { PaymentForm } from '.'
import { OrderSummary } from '.'
import { useCheckout } from './CheckoutContext'
import { Container } from '@/components/ui/container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Checkout = () => {
  const { isLoading, checkoutNotAvailable } = useCheckout()

  if (isLoading) {
    return (
      <Container centerOnPage>
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
        </Card>
      </Container>
    )
  }
  else if (checkoutNotAvailable) {
    return (
      <Container centerOnPage>
        <Card>
          <CardHeader>
            <CardTitle>Checkout not available</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your cart is empty. Please add some items to your cart before checking out.</p>
          </CardContent>
        </Card>
      </Container>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PaymentForm />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

export default Checkout
