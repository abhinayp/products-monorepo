import React from 'react'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { CartItemDTO } from '@/api-client/cart/dto/cart.dto'
import Image from 'next/image'
import { formatToDollars } from '@/helpers/common.helper'
import useItem from './useItem'
import { cn } from '@/lib/utils'
interface ItemProps {
  item: CartItemDTO
  className?: string
}

const Item = ({ item, className }: ItemProps) => {
  const { count, totalPrice, handleQuantityChange, removeCartItem } = useItem({ item })

  return (
    <div key={item.id} className={cn("flex gap-4 p-4 border-b", className)}>
      <div className="relative h-16 w-16 overflow-hidden rounded-md">
        <Image
          src={item.product?.image_url}
          alt={item.product?.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="font-medium mr-2">{item.product?.title}</div>
          <div className="font-medium">{formatToDollars(totalPrice)}</div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item, -1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center">{count}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item, 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 ml-auto text-destructive"
            onClick={() => removeCartItem.mutate(item.id)}
            disabled={removeCartItem.isPending}
          >
            {removeCartItem.isPending ? "Removing..." : <Trash2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

Item.Skeleton = () => (
  <div className="flex gap-4 px-0">
    <div className="h-16 w-16 rounded-md bg-muted animate-pulse" />
    <div className="flex-1 space-y-2">
      <div className="flex justify-between">
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        <div className="h-4 w-16 bg-muted rounded animate-pulse" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-muted rounded animate-pulse" />
        <div className="h-4 w-8 bg-muted rounded animate-pulse" />
        <div className="h-8 w-8 bg-muted rounded animate-pulse" />
      </div>
    </div>
  </div>
)

export default Item
