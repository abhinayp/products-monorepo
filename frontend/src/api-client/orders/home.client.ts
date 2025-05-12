import { CreateOrderDTO } from "./dto/home.dto"
import { OrdersClient } from "./orders.base"

export class HomeClient extends OrdersClient {
  constructor() {
    super({
      fetchOptions: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    })
  }

  async create(body: CreateOrderDTO['request']) {
    const response = await this.fetch<CreateOrderDTO['response']>('/', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      throw new Error("Failed to get cart")
    }
    return await response.json()
  }
}

export const homeClient = new HomeClient()
