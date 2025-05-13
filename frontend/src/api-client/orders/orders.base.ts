import { BaseClient } from "@/api-client/base.client"
import env from "@/util/env.util"

interface OrdersClientOptions {
  fetchOptions?: RequestInit
}

export class OrdersClient extends BaseClient {
  constructor({
    fetchOptions = {},
  }: OrdersClientOptions = {}) {
    fetchOptions.credentials = 'include'

    const host = `${env.NEXT_PUBLIC_API_GATEWAY_HOST}/orders`
    super({ host, fetchOptions })
  }
}
