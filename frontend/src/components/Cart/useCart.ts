import { itemsClient } from "@/api-client/cart/items.client"
import { useGlobal } from "@/app/GlobalContext"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

const useCart = () => {
  const { showCart, setShowCart } = useGlobal()

  const { data: cartData, isLoading, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: () => itemsClient.getCart(),
  })


  const cartTotal = Number(cartData?.cart_metadata?.net_total_price) || 0

  useEffect(() => {
    if (showCart) {
      refetch()
    }
  }, [showCart])

  return {
    cartData,
    isLoading,
    cartTotal,
    showCart,
    setShowCart
  }
}

export default useCart
