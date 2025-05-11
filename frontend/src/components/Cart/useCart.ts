import { itemsClient } from "@/api-client/cart/items.client"
import { useGlobal } from "@/app/GlobalContext"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"


const useCart = () => {
  const { showCart, setShowCart } = useGlobal()
  const [checkoutClicked, setCheckoutClicked] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/checkout') {
      setCheckoutClicked(false)
      setShowCart(false)
    }
  }, [pathname])

  const handleCheckoutClick = () => {
    setCheckoutClicked(true)
    router.push('/checkout')
  }

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
    setShowCart,
    checkoutClicked,
    handleCheckoutClick
  }
}

export default useCart
