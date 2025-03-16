export interface MeDTO {
  response: {
    id: number
    email: string
    firstname: string
    lastname: string
    phone: string
  }
}

export interface CreateDTO {
  request: {
    body: {
      user: {
        firstname: string
        lastname: string
        phone: string
        email: string
        password: string
      }
    }
  }
  response: {
    id: number
    email: string
    firstname: string
    lastname: string
    phone: string
  } | {
    error: string
  }
}
