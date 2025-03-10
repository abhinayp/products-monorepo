import { AccountsClient } from "./account.base";
import { MeDTO } from "./dto/user.dto";

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
}

export const userClient = new UserClient()
