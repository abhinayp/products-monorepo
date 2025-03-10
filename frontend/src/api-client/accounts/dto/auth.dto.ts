export interface AuthorizeDTO {
  request: {
    body: {
      email: string
      password: string
    }
  }
  response: {
    token: string
  }
}
