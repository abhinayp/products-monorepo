import type { Metadata } from "next"
import OrdersList from "@/components/orders-list"
import OrdersFilter from "@/components/orders-filter"

export const metadata: Metadata = {
  title: "My Orders | E-commerce Store",
  description: "View and manage your order history",
}

export default function OrdersPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground mt-1">View and track your order history</p>
        </div>
        <OrdersFilter />
      </div>

      <OrdersList />
    </div>
  )
}
