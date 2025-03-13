class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    page = params[:page] || 1
    page = page.to_i
    offset = (page - 1) * 10
    cart = CartItem.limit(20).offset(offset).where(user_id: current_user['id']).order(id: :desc)
    cart_metadata = CartMetadata.find_by(user_id: current_user['id'])

    cart_items_with_products = []
    if cart.present?
      products = InventoryClient::ProductsClient.new.get_all_products(cart.map(&:product_id))
      cart_items_with_products = cart.map do |cart_item|
        product = products.find { |product| product['id'] == cart_item.product_id }
        cart_item.as_json.merge(product: product)
      end
    end

    total = CartItem.where(user_id: current_user['id']).count
    render json: { cart: cart_items_with_products, total: total, cart_metadata: cart_metadata }
  end
end
