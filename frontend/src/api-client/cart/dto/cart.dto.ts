export interface CartItemDTO {
  id: number
  product_id: number
  user_id: number
  count: number
  unit_price: number
  product: {
    image_url: string
    title: string
  }
  created_at: string
  updated_at: string
}

export interface GetCartDTO {
  response: {
    cart: CartItemDTO[] | null
    total: number
    cart_metadata: {
      gross_total_price: number
      tax: number
      net_total_price: number
    } | null
  }
}

export interface AddToCartDTO {
  request: {
    body: {
      product_id: number
      quantity: number
    }
  }
  response: CartItemDTO
}

export interface UpdateCartItemDTO {
  request: {
    params: {
      id: number
    }
    body: {
      quantity: number
    }
  }
  response: CartItemDTO
}

export interface RemoveFromCartDTO {
  request: {
    params: {
      id: number
    }
  }
}
