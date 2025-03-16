import { AccountsClient } from "./account.base";
import { MeDTO, CreateDTO } from "./dto/user.dto";

export class UserClient extends AccountsClient {
  constructor() {
    super({
      fetchOptions: {
        headers: {
          'Content-Type': 'application/json',
        }
      },
    })
  }

  async me() {
    const response = await this.fetch<MeDTO['response']>('/users/me', {
      method: 'GET',
    })

    if (response.status !== 200) {
      throw new Error('Failed to fetch user data')
    }

    return await response.json()
  }

  async create(body: CreateDTO['request']['body']) {
    const response = await this.fetch<CreateDTO['response']>('/users', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    if (![200, 201, 400].includes(response.status)) {
      throw new Error('Failed to create user')
    }

    return await response.json()
  }
}

export const userClient = new UserClient()
