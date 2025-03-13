"use client"

import { Card, CardContent, CardFooter } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ChevronDown, Heart, ShoppingCart, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useGlobal } from "@/app/GlobalContext"
import { useMutation } from "@tanstack/react-query"
import { productsClient } from "@/api-client/inventory/products.client"
import { toast } from "sonner"
interface Props {
  id: number
  title: string
  price: number
  description: string
  category: string
  image_url: string
  available_count?: number
  hold_count?: number
  sold_count?: number
  cart_users_count?: number
  your_cart_count?: number
}

const Product = (product: Props) => {
  const { setShowCart } = useGlobal()

  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: () => productsClient.addToCart({ id: product.id }),
    onSuccess: () => {
      setShowCart(true)
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        description: "Please try again later",
      })
    },
  })

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
          {product.cart_users_count !== undefined && product.cart_users_count > 0 && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="gap-1.5">
                <Users className="h-3 w-3" />
                {product.cart_users_count} in cart
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground mb-1 capitalize">{product.category}</div>
            {product.available_count !== undefined && product.available_count <= 5 && product.available_count > 0 && (
            <p className="text-xs text-yellow-600 dark:text-yellow-500">
              Only {product.available_count} left in stock
            </p>
          )}
          {product.available_count === 0 && (
            <p className="text-xs text-destructive">
              Out of stock
            </p>
          )}
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

const ProductSkeleton = () => {
  return (
    <Card className="group overflow-hidden">
      <CardContent className="pt-4">
        <div className="h-48 w-full bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="mt-4">
          <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mt-2"></div>
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mt-2"></div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0">
        <div>
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </CardFooter>
    </Card>
  )
}

Product.Skeleton = ProductSkeleton

export default Product
