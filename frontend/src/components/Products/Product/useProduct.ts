import { useMutation } from "@tanstack/react-query"
import { useGlobal } from "@/app/GlobalContext"
import { useQueryClient } from "@tanstack/react-query"
import { productsClient } from "@/api-client/inventory/products.client"
import { toast } from "sonner"

const useProduct = ({ productId }: { productId: number }) => {
  const { setShowCart } = useGlobal()
  const queryClient = useQueryClient()
  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: () => productsClient.addToCart({ id: productId }),
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

  return {
    addToCart,
    isPending,
  }
}

export default useProduct
