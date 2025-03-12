module InventoryClient
  class ProductsClient < InventoryClient::BaseClient
    def get_all_products(product_ids)
      get("/products/get_all_products?ids=#{product_ids.join(',')}")
    end
  end
end
