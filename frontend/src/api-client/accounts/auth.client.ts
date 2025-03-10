import { AccountsClient } from "./account.base";
import { AuthorizeDTO } from "./dto/auth.dto";

export class AuthClient extends AccountsClient {
  constructor() {
    super({
      fetchOptions: {
        headers: {
          'Content-Type': 'application/json',
        }
      },
    })
  }

  async authorize(body: AuthorizeDTO['request']['body']) {
    const response = await this.fetch<AuthorizeDTO['response']>('/auth/authorize', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    if (response.status !== 200) {
      throw new Error('Invalid email or password')
    }

    const data = await response.json()
    return data
  }

  async logout() {
    const response = await this.fetch('/auth/logout', {
      method: 'DELETE',
    })

    return response.status === 204
  }
}

export const authClient = new AuthClient()
