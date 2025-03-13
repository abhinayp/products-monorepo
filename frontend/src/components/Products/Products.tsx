"use client"

import React, { useEffect, useState } from 'react'
import { productsClient } from '@/api-client/inventory/products.client'
import { useQuery } from '@tanstack/react-query'
import Product from './Product'
import useWebsockets from '@/hooks/useWebsockets'
import { GetProductsDTO } from '@/api-client/inventory/dto/product.dto'
import { getProductsFromProductMetrics } from './products.helper'
const Products = () => {
  const [products, setProducts] = useState<GetProductsDTO['response']>([])
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsClient.getProducts(),
  })

  useEffect(() => {
    setProducts(productsData || [])
  }, [productsData])

  const productIds = products?.map((product) => product.id)

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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <Product.Skeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products?.map((product, index) => (
        <Product key={index} {...product} />
      ))}
    </div>
  )
}

export default Products
