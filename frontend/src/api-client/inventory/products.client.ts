import { GetProductsDTO } from "./dto/product.dto"
import { InventoryClient } from "./inventory.base"

export class ProductsClient extends InventoryClient {
  constructor() {
    super({
      fetchOptions: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    })
  }

  async getProducts() {
    const response = await this.fetch<GetProductsDTO['response']>("/products")
    return await response.json()
  }
}

export const productsClient = new ProductsClient()
