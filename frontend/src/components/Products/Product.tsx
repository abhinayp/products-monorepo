"use client"

import { Card, CardContent, CardFooter } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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
  return (
    <Card key={product.id} className="group overflow-hidden">
    <div className="relative pt-4 px-4">
      {/* {product.isNew && <Badge className="absolute top-6 left-6 z-10">New</Badge>}
      {product.isSale && (
        <Badge variant="destructive" className="absolute top-6 right-6 z-10">
          Sale
        </Badge>
      )} */}
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={product.image_url || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button size="icon" variant="secondary" className="rounded-full">
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
      </div>
    </div>
    <CardContent className="pt-4">
      <div className="text-sm text-muted-foreground capitalize">{product.category}</div>
      <Link href={`/products/${product.id}`} className="block">
        <h3 className="font-medium mt-1 hover:underline">{product.title}</h3>
      </Link>
    </CardContent>
    <CardFooter className="flex justify-between items-center pt-0">
      <div>
        {/* {product.isSale ? (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground line-through">${product.price.toFixed(2)}</span>
            <span className="font-medium text-destructive">${product.salePrice?.toFixed(2)}</span>
          </div>
        ) : ( */}
          <span className="font-medium">${Number(product.price).toFixed(2)}</span>
        {/* )} */}
      </div>
      {/* <div className="flex items-center">
        <span className="text-sm text-muted-foreground">{product.rating}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-yellow-500 ml-1"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      </div> */}
    </CardFooter>
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
