import { GetProductsDTO } from "@/api-client/inventory/dto/product.dto"
import { productsClient } from "@/api-client/inventory/products.client"
import useWebsockets from "@/hooks/useWebsockets"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getProductsFromProductMetrics } from "./products.helper"

const useProducts = () => {
  const [products, setProducts] = useState<GetProductsDTO['response']>([])
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsClient.getProducts(),
  })

  useEffect(() => {
    setProducts(productsData || [])
  }, [productsData])

  const productIds = products?.map((product) => product.id)

  // Websocket to update real-time product metrics
  const { socket } = useWebsockets({
    path: "/products",
    managerOptions: {
      query: {
        rooms: productIds || []
      }
    }
  })

  useEffect(() => {
    if (!productsData) return
    socket?.current?.on("update_metrics", ({ product_id, user_count }: {
      product_id: number,
      user_count: number
    }) => {
      console.log("updating products...");
      const newProducts = getProductsFromProductMetrics(productsData, { product_id, user_count })
      setProducts(() => [...newProducts])
    })

    return () => {
      socket?.current?.off("update_metrics")
    }
  }, [socket, productsData, products])

  return {
    products,
    isLoading,
  }
}

export default useProducts
