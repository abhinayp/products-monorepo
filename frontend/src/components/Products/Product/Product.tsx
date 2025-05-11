"use client"

import { Card, CardContent, CardFooter } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Users } from "lucide-react"
import Image from "next/image"
import useProduct, { UseProductProps } from "./useProduct"

interface Props extends UseProductProps { }

const Product = (product: Props) => {
  const {
    addToCart,
    isPending,
    lowStock,
    outOfStock,
  } = useProduct({ product: product })

  // Stock availability badge
  let stockAvailabilityBadgeView = null
  if (lowStock) {
    stockAvailabilityBadgeView = (
      <p className="text-xs text-yellow-600 dark:text-yellow-500">
        Only {product.available_count} left in stock
      </p>
    )
  } else if (outOfStock) {
    stockAvailabilityBadgeView = (
      <p className="text-xs text-destructive">
        Out of stock
      </p>
    )
  }

  // Cart users badge
  let cartUsersBadgeView = null
  if (product.cart_users_count) {
    cartUsersBadgeView = (
      <div className="absolute top-2 right-2">
        <Badge variant="secondary" className="gap-1.5">
          <Users className="h-3 w-3" />
          {product.cart_users_count} {product.cart_users_count > 1 ? "others" : "other"} added to cart
        </Badge>
      </div>
    )
  }


  return (
    <Card key={product.id} className="overflow-hidden group p-0">
      <div className="relative block">
        <div className="overflow-hidden">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.title}
            width={400}
            height={400}
            className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {cartUsersBadgeView}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground mb-1 capitalize">{product.category}</div>
            {stockAvailabilityBadgeView}
          </div>
          <h3 className="font-medium text-lg truncate">{product.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 h-10">{product.description}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <span className="font-semibold">${Number(product.price).toFixed(2)}</span>
          <Button
            size="sm"
            onClick={() => addToCart()}
            disabled={isPending || product.available_count === 0}
          >
            {isPending ? "Adding..." : product.available_count === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}

// Loading skeleton
const ProductSkeleton = () => {
  return (
    <Card className="group overflow-hidden p-0">
      <div className="h-63 w-full bg-gray-200 animate-pulse rounded-lg"></div>
      <CardContent className="p-4 pt-0">
        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mt-2"></div>
        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mt-2"></div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <div>
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div>
          <div className="h-8 w-25 bg-zinc-600 animate-pulse rounded-lg"></div>
        </div>
      </CardFooter>
    </Card>
  )
}

Product.Skeleton = ProductSkeleton

export default Product
