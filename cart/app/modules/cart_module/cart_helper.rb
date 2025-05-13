module CartModule
  class CartHelper
    def self.get_cart_data(page:, user_id:)
      page = page || 1
      page = page.to_i
      offset = (page - 1) * 10
      cart = CartItem.limit(20).offset(offset).where(user_id: user_id).order(id: :desc)
      cart_metadata = CartMetadata.find_by(user_id: user_id)

      cart_items_with_products = []
      if cart.present?
        products = InventoryClient::ProductsClient.new.get_all_products(cart.map(&:product_id))
        cart_items_with_products = cart.map do |cart_item|
          product = products.find { |product| product['id'] == cart_item.product_id }
          cart_item.as_json.merge(product: product)
        end
      end

      total = CartItem.where(user_id: user_id).count
      return { cart: cart_items_with_products, total: total, cart_metadata: cart_metadata }
    end

    def self.clear_cart(user_id:)
      ActiveRecord::Base.transaction do
        cartItems = CartItem.where(user_id: user_id)
        cartItems.destroy_all
        CartMetadata.find_by(user_id: user_id).destroy
        cartItems.each do |cartItem|
          CartProducer.update_metrics(product_id: cartItem.product_id, new_item_count: -1 * cartItem.count)
        end
      end

      return { success: true }
    end

    def self.remove_item(id:)
      data = CartItem.remove_item(id)
      if data
        cart = data[:cart]
        CartProducer.update_metrics(product_id: cart.product_id, new_item_count: -1 * cart.count)
        return { success: true }
      else
        return { error: "deletion failed" }
      end
    end
  end
end
