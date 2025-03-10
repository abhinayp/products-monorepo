interface BaseClientOptions {
  host: string
  fetchOptions?: RequestInit
}

// add this, after removing fetch calls in other places
// declare global {
//   interface Response<T = never> {
//     json(): Promise<T>
//   }
// }

interface SafeResponse<T = never> extends Response {
  json(): Promise<T>
}

export class BaseClient {
  private host: string
  private fetchOptions: RequestInit = {}

  constructor({ host, fetchOptions }: BaseClientOptions) {
    this.host = host
    this.fetchOptions = fetchOptions || {}
  }

  fetch<T = never>(path: string, init?: RequestInit): Promise<SafeResponse<T>> {
    init = { ...this.fetchOptions, ...init }
    const url = this.buildUrl(path)
    return fetch(url, init)
  }

  private buildUrl(path: string) {
    let host = this.host
    if (host.endsWith('/')) {
      host = host.slice(0, -1)
    }
    if (path.startsWith('/')) {
      path = path.slice(1)
    }
    return `${this.host}/${path}`
  }
}
