"use client"
import Link from "next/link"
import { CheckCircle, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { homeClient } from "@/api-client/orders/home.client"
import { Container } from "@/components/ui/container"
import { formatToDollars } from "@/helpers/common.helper"
import { getStateName, getCountryName } from "@/helpers/address.helper"
export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const { data, isLoading, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => homeClient.show({ id: Number(orderId) }),
    enabled: !!orderId,
  })

  const isConfirmed = ['pending', 'completed'].includes(data?.order.status ?? '')

  if (!orderId) {
    return (
      <Container centerOnPage>
        <Card>
          <CardHeader>
            <CardTitle>Order not found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The order you are looking for does not exist.</p>
          </CardContent>
        </Card>
      </Container>
    )
  }

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

  if (error) {
    return (
      <Container centerOnPage>
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>An error occurred while loading the order.</p>
          </CardContent>
        </Card>
      </Container>
    )
  }

  if (!isConfirmed) {
    return (
      <Container centerOnPage>
        <Card>
          <CardHeader>
            <CardTitle>Order not confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The order you are looking for is not confirmed.</p>
          </CardContent>
        </Card>
      </Container>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl">Order Confirmed!</CardTitle>
          <CardDescription>Your order #{orderId} has been successfully placed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-md">
            <p className="text-sm">
              A confirmation email has been sent to <span className="font-medium">{data?.order_contact.email}</span>
            </p>
          </div>

          <div className="space-y-2 text-left">
            <h3 className="font-medium">Order Summary</h3>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatToDollars(data?.order.gross_total_price ?? 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatToDollars(data?.order.tax ?? 0)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatToDollars(data?.order.total_price ?? 0)}</span>
            </div>
          </div>

          <div className="space-y-2 text-left">
            <h3 className="font-medium">Shipping Information</h3>
            <p className="text-sm">
              {data?.order_contact.name}
              <br />
              {data?.order_shipping.street}
              <br />
              {data?.order_shipping.city}, {getStateName(data?.order_shipping.state ?? '')} {data?.order_shipping.zip}
              <br />
              {getCountryName(data?.order_shipping.country ?? '')}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>Estimated delivery: June 15-18, 2025</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href={`/orders/ORD-${orderId}`}>
              <Package className="mr-2 h-4 w-4" />
              Track Your Order
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
