"use client"

import React from 'react'
import { Product } from './Product'
import useProducts from './useProducts'

const Products = () => {
  const { products, isLoading } = useProducts()

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
