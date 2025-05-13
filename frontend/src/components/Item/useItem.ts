import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { CartItemDTO } from '@/api-client/cart/dto/cart.dto'
import { itemsClient } from '@/api-client/cart/items.client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

interface ItemProps {
  item: CartItemDTO
}

const useItem = ({ item }: ItemProps) => {
  const [count, setCount] = useState(item.count)
  const queryClient = useQueryClient()
  const updateCartItem = useMutation({
    mutationFn: ({ itemId, count }: { itemId: number; count: number }) =>
      itemsClient.updateCartItem({ id: itemId }, { item: { count } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        description: "Please try again later",
      })
    },
  })

  const removeCartItem = useMutation({
    mutationFn: (itemId: number) => itemsClient.removeFromCart({ id: itemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        description: "Please try again later",
      })
    },
  })

  useEffect(() => {
    setCount(item.count)
  }, [item.count])

  const totalPrice = Number(item.unit_price || 0) * Number(item.count || 0)

  const handleQuantityChange = (item: CartItemDTO, change: number) => {
    const newQuantity = item.count + change
    setCount(newQuantity)
    if (newQuantity < 1) {
      removeCartItem.mutate(item.id)
    } else {
      updateCartItem.mutate({ itemId: item.id, count: newQuantity })
    }
  }

  return {
    count,
    totalPrice,
    handleQuantityChange,
    removeCartItem,
    updateCartItem,
  }
}

export default useItem
