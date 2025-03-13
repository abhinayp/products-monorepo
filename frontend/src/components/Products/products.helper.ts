import { GetProductsDTO } from "@/api-client/inventory/dto/product.dto"

const getProductsFromProductMetrics = (products: GetProductsDTO['response'], { product_id, user_count }: { product_id: number, user_count: number }) => {
  const newProducts: GetProductsDTO['response'] = []
  products.forEach((product: any) => {
    if (product.id === product_id && product.your_cart_count) {
      product.cart_users_count = user_count - 1
      newProducts.push(product)
    }
    else if (product.id === product_id && !product.your_cart_count) {
      product.cart_users_count = user_count
      newProducts.push(product)
    }
    else {
      newProducts.push(product)
    }
  })
  return newProducts
}

export {
  getProductsFromProductMetrics
}
