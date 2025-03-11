"use client"

import React from 'react'
import { productsClient } from '@/api-client/inventory/products.client'
import { useQuery } from '@tanstack/react-query'
import Product from './Product'

const Products = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsClient.getProducts(),
  })

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
      {products?.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  )
}

export default Products
