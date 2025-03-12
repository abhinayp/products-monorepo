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
    return await response.json()
  }

  async updateCartItem(params: UpdateCartItemDTO['request']['params'], body: UpdateCartItemDTO['request']['body']) {
    const response = await this.fetch<CartItemDTO>(`/items/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
    return await response.json()
  }

  async removeFromCart(params: RemoveFromCartDTO['request']['params']) {
    await this.fetch<void>(`/items/${params.id}`, {
      method: 'DELETE',
    })
  }
}

export const itemsClient = new ItemsClient()
