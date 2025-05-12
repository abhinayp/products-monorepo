"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ChevronRight, Package, CheckCircle, Clock, AlertCircle, Truck, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import useOrders from "./useOrders"
import { formatToDollars } from "@/helpers/common.helper"

// Mock data for orders
// const mockOrders = [
//   {
//     id: "ORD-38492",
//     date: new Date(2025, 4, 5), // May 5, 2025
//     total: 210.17,
//     status: "delivered",
//     items: [
//       { id: 1, name: "Minimalist Watch", price: 129.99, quantity: 1 },
//       { id: 2, name: "Leather Wallet", price: 59.99, quantity: 1 },
//     ],
//     tracking: "USP12345678",
//     deliveryDate: new Date(2025, 4, 10), // May 10, 2025
//   },
//   {
//     id: "ORD-38475",
//     date: new Date(2025, 3, 28), // April 28, 2025
//     total: 349.95,
//     status: "shipped",
//     items: [
//       { id: 3, name: "Wireless Headphones", price: 199.99, quantity: 1 },
//       { id: 4, name: "Smart Water Bottle", price: 49.99, quantity: 1 },
//       { id: 5, name: "Fitness Tracker", price: 99.97, quantity: 1 },
//     ],
//     tracking: "USP87654321",
//     deliveryDate: new Date(2025, 4, 15), // May 15, 2025
//   },
//   {
//     id: "ORD-38461",
//     date: new Date(2025, 3, 15), // April 15, 2025
//     total: 89.99,
//     status: "processing",
//     items: [
//       { id: 6, name: "Portable Charger", price: 39.99, quantity: 1 },
//       { id: 7, name: "Phone Case", price: 25.0, quantity: 2 },
//     ],
//   },
//   {
//     id: "ORD-38442",
//     date: new Date(2025, 3, 2), // April 2, 2025
//     total: 159.98,
//     status: "cancelled",
//     items: [{ id: 8, name: "Bluetooth Speaker", price: 79.99, quantity: 2 }],
//   },
//   {
//     id: "ORD-38421",
//     date: new Date(2025, 2, 20), // March 20, 2025
//     total: 499.99,
//     status: "delivered",
//     items: [{ id: 9, name: "Tablet", price: 499.99, quantity: 1 }],
//     tracking: "USP11223344",
//     deliveryDate: new Date(2025, 2, 25), // March 25, 2025
//   },
// ]

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

export default function OrdersList() {
  const [searchQuery, setSearchQuery] = useState("")
  const { orders, isLoading, error } = useOrders()

  if (isLoading) return <OrdersList.Skeleton />

  // Filter orders based on search query
  const filteredOrders = orders?.filter(
    (order) =>
      String(order.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_items.some((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())),
  ) || []

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search orders by ID or product name..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No orders found</h3>
          <p className="mt-1 text-muted-foreground">
            {searchQuery ? "Try a different search term" : "You haven't placed any orders yet"}
          </p>
          {searchQuery ? (
            <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
              Clear search
            </Button>
          ) : (
            <Button asChild className="mt-4">
              <Link href="/products">Start shopping</Link>
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <div className="bg-muted px-4 py-3 flex justify-between items-center">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="font-medium">ORD-{order.id}</span>
                    <span className="text-sm text-muted-foreground">{format(order.created_at, "MMMM d, yyyy")}</span>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {order.order_items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{formatToDollars(item.unit_price)}</p>
                      </div>
                    ))}
                  </div>

                  {/* {(order.status === "shipped" || order.status === "delivered") && (
                    <>
                      <Separator className="my-4" />
                      <div className="flex flex-col sm:flex-row justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium">Tracking Number</p>
                          <p className="text-sm text-muted-foreground">{order.tracking}</p>
                        </div>
                        {order.deliveryDate && (
                          <div>
                            <p className="text-sm font-medium">
                              {order.status === "delivered" ? "Delivered on" : "Estimated Delivery"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {format(order.deliveryDate, "MMMM d, yyyy")}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )} */}
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t p-4 bg-muted/30">
                  <p className="font-medium">Total: {formatToDollars(order.total_price)}</p>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/orders/ORD-${order.id}`}>
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination> */}
        </>
      )}
    </div>
  )
}

OrdersList.Skeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded animate-pulse bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/4 animate-pulse bg-muted rounded" />
                    <div className="h-4 w-1/2 animate-pulse bg-muted rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-1/3 animate-pulse bg-muted rounded" />
                  <div className="h-4 w-1/4 animate-pulse bg-muted rounded" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t p-4 bg-muted/30">
              <div className="h-4 w-24 animate-pulse bg-muted rounded" />
              <div className="h-9 w-32 animate-pulse bg-muted rounded" />
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="h-10 w-[350px] animate-pulse bg-muted rounded" />
      </div>
    </div>
  )
}
