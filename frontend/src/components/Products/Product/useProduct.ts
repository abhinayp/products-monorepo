import { useMutation } from "@tanstack/react-query"
import { useGlobal } from "@/app/GlobalContext"
import { useQueryClient } from "@tanstack/react-query"
import { productsClient } from "@/api-client/inventory/products.client"
import { toast } from "sonner"

export interface UseProductProps {
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

const useProduct = ({ product }: { product: UseProductProps }) => {
  const { setShowCart } = useGlobal()
  const queryClient = useQueryClient()
  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: () => productsClient.addToCart({ id: product.id }),
    onSuccess: () => {
      setShowCart(true)
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        description: "Please try again later",
      })
    },
  })
  const lowStock = product.available_count !== undefined && product.available_count <= 5 && product.available_count > 0
  const outOfStock = product.available_count === 0

  return {
    addToCart,
    isPending,
    lowStock,
    outOfStock,
  }
}

export default useProduct
