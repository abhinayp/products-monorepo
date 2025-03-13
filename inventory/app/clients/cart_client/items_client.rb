module CartClient
  class ItemsClient < CartClient::BaseClient
    def create(item)
      post('/items', item)
    end

    def get_products_cart_items(user_id, product_ids)
      get("/items/get_products_cart_items?user_id=#{user_id}&product_ids=#{product_ids}")
    end
  end
end
