class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    page = params[:page] || 1
    page = page.to_i
    offset = (page - 1) * 10
    cart = CartItem.limit(20).offset(page).find_by(user_id: current_user['id'])
    cart_metadata = CartMetadata.find_by(user_id: current_user['id'])
    total = CartItem.where(user_id: current_user['id']).count
    render json: { cart: cart, total: total, cart_metadata: cart_metadata }
  end
end
