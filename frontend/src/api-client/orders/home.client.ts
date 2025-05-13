import { CreateOrderDTO, OrdersDTO, ShowOrderDTO, StatusHistoryDTO } from "./dto/home.dto"
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

  async index(params: OrdersDTO['request']={}) {
    const queryParams = new URLSearchParams()
    if (params.page) {
      queryParams.set('page', params.page.toString())
    }
    if (params.offset) {
      queryParams.set('offset', params.offset.toString())
    }
    const response = await this.fetch<OrdersDTO['response']>(`/?${queryParams.toString()}`, {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error("Failed to get orders")
    }
    return await response.json()
  }

  async show(params: ShowOrderDTO['request']) {
    const response = await this.fetch<ShowOrderDTO['response']>(`/${params.id}`, {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error("Failed to get order")
    }
    return await response.json()
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

  async statusHistory(params: StatusHistoryDTO['request']) {
    const response = await this.fetch<StatusHistoryDTO['response']>(`/${params.id}/status_history`, {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error("Failed to get status history")
    }
    return await response.json()
  }
}

export const homeClient = new HomeClient()
