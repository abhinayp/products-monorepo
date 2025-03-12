export interface GetProductsDTO {
  response: {
    id: number
    title: string
    price: number
    description: string
    category: string
    image_url: string
    available_count: number
    hold_count: number
    sold_count: number
  }[]
}

export interface AddToCartDTO {
  request: {
    params: {
      id: number
    }
  }
}
