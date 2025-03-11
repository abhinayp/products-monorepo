import { BaseClient } from "@/api-client/base.client"
import env from "@/util/env.util"

interface InventoryClientOptions {
  fetchOptions?: RequestInit
}

export class InventoryClient extends BaseClient {
  constructor({
    fetchOptions = {},
  }: InventoryClientOptions = {}) {
    fetchOptions.credentials = 'include'

    const host = `${env.NEXT_PUBLIC_API_GATEWAY_HOST}/inventory`
    super({ host, fetchOptions })
  }
}
