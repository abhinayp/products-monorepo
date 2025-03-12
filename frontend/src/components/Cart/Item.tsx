import React from 'react'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { CartItemDTO } from '@/api-client/cart/dto/cart.dto'
import Image from 'next/image'
import { itemsClient } from '@/api-client/cart/items.client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatToDollars } from '@/helpers/common.helper'

interface ItemProps {
  item: CartItemDTO
}

const Item = ({ item }: ItemProps) => {
  const queryClient = useQueryClient()
  const updateCartItem = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      itemsClient.updateCartItem({ id: itemId }, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const removeCartItem = useMutation({
    mutationFn: (itemId: number) => itemsClient.removeFromCart({ id: itemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const totalPrice = Number(item.unit_price || 0) * Number(item.count || 0)

  const handleQuantityChange = (item: CartItemDTO, change: number) => {
    const newQuantity = item.count + change
    if (newQuantity < 1) {
      removeCartItem.mutate(item.id)
    } else {
      updateCartItem.mutate({ itemId: item.id, quantity: newQuantity })
    }
  }

  return (
    <div key={item.id} className="flex gap-4 p-4 border-b">
      <div className="relative h-16 w-16 overflow-hidden rounded-md">
        <Image
          src={item.product.image_url}
          alt={item.product.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="font-medium">{item.product.title}</div>
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
          <span className="w-8 text-center">{item.count}</span>
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
            className="h-8 w-8 ml-auto"
            onClick={() => removeCartItem.mutate(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Item
