import { BaseClient } from "@/api-client/base.client"
import env from "@/util/env.util"

interface AccountsClientOptions {
  fetchOptions?: RequestInit
}

export class AccountsClient extends BaseClient {
  constructor({
    fetchOptions = {},
  }: AccountsClientOptions = {}) {
    fetchOptions.credentials = 'include'

    const host = `${env.NEXT_PUBLIC_API_GATEWAY_HOST}/accounts`
    super({ host, fetchOptions })
  }
}
