"use client"

import { Card, CardContent, CardFooter } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ChevronDown, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useGlobal } from "@/app/GlobalContext"
import { useMutation } from "@tanstack/react-query"
import { productsClient } from "@/api-client/inventory/products.client"

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
}

const Product = (product: Props) => {
  const { setShowCart } = useGlobal()

  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: () => productsClient.addToCart({ id: product.id }),
    onSuccess: () => {
      setShowCart(true)
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
      </div>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
        <h3 className="font-medium text-lg truncate">{product.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="font-semibold">${Number(product.price).toFixed(2)}</span>
          <Button size="sm" onClick={() => addToCart()} disabled={isPending}>
            {isPending ? "Adding..." : "Add to Cart"}
            {/* <ChevronDown className="h-4 w-4 ml-1" /> */}
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
