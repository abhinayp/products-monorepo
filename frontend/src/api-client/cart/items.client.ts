import { CartClient } from "./cart.base"
import { CartItemDTO, GetCartDTO, RemoveFromCartDTO, UpdateCartItemDTO } from "./dto/cart.dto"

export class ItemsClient extends CartClient {
  constructor() {
    super({
      fetchOptions: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    })
  }

  async getCart() {
    const response = await this.fetch<GetCartDTO['response']>('/')
    if (!response.ok) {
      throw new Error("Failed to get cart")
    }
    return await response.json()
  }

  async updateCartItem(params: UpdateCartItemDTO['request']['params'], body: UpdateCartItemDTO['request']['body']) {
    const response = await this.fetch<CartItemDTO>(`/items/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      throw new Error("Failed to update cart item")
    }
    return await response.json()
  }

  async removeFromCart(params: RemoveFromCartDTO['request']['params']) {
    const response = await this.fetch<void>(`/items/${params.id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error("Failed to remove from cart")
    }
    return await response.json()
  }
}

export const itemsClient = new ItemsClient()
