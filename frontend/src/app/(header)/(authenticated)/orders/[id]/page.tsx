"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, AlertCircle, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useOrder from "./useOrder"
import { format } from "date-fns"
import { useParams, useSearchParams } from "next/navigation"
import { formatToDollars } from "@/helpers/common.helper"
import { getCountryName, getStateName } from "@/helpers/address.helper"
// Mock data for a specific order
const orderDetails = {
  id: "ORD-38492",
  date: "May 5, 2025",
  total: 210.17,
  subtotal: 189.98,
  shipping: 4.99,
  tax: 15.2,
  status: "delivered",
  items: [
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
  ],
  tracking: "USP12345678",
  carrier: "UPS",
  deliveryDate: "May 10, 2025",
  shippingAddress: {
    name: "John Doe",
    street: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    country: "United States",
  },
  billingAddress: {
    name: "John Doe",
    street: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    country: "United States",
  },
  paymentMethod: "Visa ending in 4242",
  timeline: [
    { date: "May 5, 2025", time: "10:23 AM", status: "Order Placed", description: "Your order has been received" },
    {
      date: "May 6, 2025",
      time: "9:45 AM",
      status: "Payment Confirmed",
      description: "Payment has been processed successfully",
    },
    {
      date: "May 7, 2025",
      time: "2:30 PM",
      status: "Order Shipped",
      description: "Your order has been shipped via UPS",
    },
    {
      date: "May 10, 2025",
      time: "11:15 AM",
      status: "Order Delivered",
      description: "Your package has been delivered",
    },
  ],
}

// Status badge component
function OrderStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "delivered":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="h-3.5 w-3.5 mr-1" />
          Delivered
        </Badge>
      )
    case "shipped":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Truck className="h-3.5 w-3.5 mr-1" />
          Shipped
        </Badge>
      )
    case "completed":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Truck className="h-3.5 w-3.5 mr-1" />
          Placed
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="h-3.5 w-3.5 mr-1" />
          Processing
        </Badge>
      )
    case "cancelled":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <AlertCircle className="h-3.5 w-3.5 mr-1" />
          Cancelled
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function OrderDetailsPage() {
  // In a real app, you would fetch the order details based on the ID
  const searchParams = useParams()
  const id = searchParams.id
  const orderId = id?.toString().split("-")[1]
  console.log(id, orderId)

  const { order, orderItems, orderShipping, orderContact, orderPayment, isLoading, error } = useOrder(orderId)

  if (isLoading) return <OrderDetailsPage.Skeleton />
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/orders">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to orders</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Order {order?.id}</h1>
            <p className="text-muted-foreground">Placed on {order?.created_at ? format(order?.created_at, "MMMM d, yyyy") : ""}</p>
          </div>
        </div>
        <OrderStatusBadge status={order?.status || ""} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={item.image_url || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium">{item.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{formatToDollars(item.unit_price || 0)}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatToDollars(item.unit_price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p className="text-sm text-muted-foreground">
                    {orderShipping?.street}
                    <br />
                    {orderShipping?.city}, {getStateName(orderShipping?.state || "")}{" "}
                    {orderShipping?.zip}
                    <br />
                    {getCountryName(orderShipping?.country || "")}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Billing Address</h3>
                  <p className="text-sm text-muted-foreground">
                    {orderContact?.name}
                    <br />
                    {orderPayment?.street}
                    <br />
                    {orderPayment?.city}, {getStateName(orderPayment?.state || "")}{" "}
                    {orderPayment?.zip}
                    <br />
                    {getCountryName(orderPayment?.country || "")}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Shipping Method</h3>
                  <p className="text-sm text-muted-foreground">Standard Shipping ({orderShipping?.carrier || "UPS"})</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="text-sm text-muted-foreground">{orderPayment?.description}</p>
                </div>
              </div>

              {/* {orderDetails.status === "shipped" || orderDetails.status === "delivered" ? (
                <>
                  <Separator className="my-4" />
                  <div>
                    <h3 className="font-medium mb-2">Tracking Information</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Tracking Number: <span className="font-medium">{orderDetails.tracking}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">Carrier: {orderDetails.carrier}</p>
                      </div>
                      <Button variant="outline" size="sm" className="sm:ml-auto">
                        <Truck className="mr-2 h-4 w-4" />
                        Track Package
                      </Button>
                    </div>
                  </div>
                </>
              ) : null} */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative border-l border-muted">
                {orderDetails.timeline.map((event, index) => (
                  <li key={index} className="mb-6 ml-6 last:mb-0">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-muted rounded-full -left-3 ring-8 ring-background">
                      {index === orderDetails.timeline.length - 1 ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </span>
                    <h3 className="font-medium">{event.status}</h3>
                    <time className="block text-xs text-muted-foreground mb-1">
                      {event.date} at {event.time}
                    </time>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatToDollars(order?.gross_total_price || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatToDollars(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatToDollars(order?.tax || 0)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{formatToDollars(order?.total_price || 0)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                <Package className="mr-2 h-4 w-4" />
                Return Items
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
              <Separator />
              <div className="text-sm text-muted-foreground">
                <p>Have questions about your order?</p>
                <Link href="/contact" className="text-primary hover:underline">
                  Contact Customer Support
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

OrderDetailsPage.Skeleton = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-md animate-pulse bg-gray-200" />
          <div>
            <div className="h-8 w-48 rounded animate-pulse bg-gray-200" />
            <div className="h-4 w-32 mt-2 rounded animate-pulse bg-gray-200" />
          </div>
        </div>
        <div className="h-6 w-24 rounded animate-pulse bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <div className="h-6 w-32 rounded animate-pulse bg-gray-200" />
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-16 w-16 rounded animate-pulse bg-gray-200" />
                    <div className="flex-1">
                      <div className="h-4 w-48 rounded animate-pulse bg-gray-200" />
                      <div className="h-4 w-24 mt-2 rounded animate-pulse bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <div className="h-6 w-32 rounded animate-pulse bg-gray-200" />
            </div>
            <div className="p-6 space-y-4">
              <div className="h-10 w-full rounded animate-pulse bg-gray-200" />
              <div className="h-10 w-full rounded animate-pulse bg-gray-200" />
              <div className="h-px w-full bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 w-48 rounded animate-pulse bg-gray-200" />
                <div className="h-4 w-32 rounded animate-pulse bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
