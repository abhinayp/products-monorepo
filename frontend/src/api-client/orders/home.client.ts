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

  async create() {
    const response = await this.fetch<{}>('/')
    if (!response.ok) {
      throw new Error("Failed to get cart")
    }
    return await response.json()
  }
}

export const homeClient = new HomeClient()
