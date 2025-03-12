import { BaseClient } from "@/api-client/base.client"
import env from "@/util/env.util"

interface CartClientOptions {
  fetchOptions?: RequestInit
}

export class CartClient extends BaseClient {
  constructor({
    fetchOptions = {},
  }: CartClientOptions = {}) {
    fetchOptions.credentials = 'include'

    const host = `${env.NEXT_PUBLIC_API_GATEWAY_HOST}/cart`
    super({ host, fetchOptions })
  }
}
