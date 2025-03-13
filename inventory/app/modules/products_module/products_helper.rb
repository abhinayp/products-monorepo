module ProductsModule
  class ProductsHelper
    def self.get_products_data(user_id:)
      products = Product.includes(:product_inventory, :product_cart)
      if user_id.present?
        product_ids = products.pluck(:id).join(',')
        cart_items = CartClient::ItemsClient.new.get_products_cart_items(user_id, product_ids)
      end

      products.map do |product|
        product_json = product.as_json.merge(get_inventory(product))
        cart_item = get_cart_item(product_id: product.id, cart_items: cart_items)
        product_json['cart_users_count'] = product.product_cart.user_count if product.product_cart.present?
        product_json['your_cart_count'] = cart_item['count'] if cart_item.present?
        product_json['cart_users_count'] = product_json['cart_users_count'] - 1 if cart_item.present? && cart_item['count'] > 0 && product_json['cart_users_count'] > 0
        product_json
      end
    end

    def self.get_product_data(id)
      product = Product.includes(:product_inventory).find(id)
      product.as_json.merge(get_inventory(product))
    end

    def self.get_inventory(product)
      {
        available_count: product.product_inventory.available_count,
        hold_count: product.product_inventory.hold_count,
        sold_count: product.product_inventory.sold_count
      }
    end

    def self.get_cart_item(product_id:, cart_items:)
      if cart_items.present?
        cart_item = cart_items.find { |item| item['product_id'] == product_id }
        cart_item
      end
    end
  end
end
