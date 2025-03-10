class ItemsController < ApplicationController
  before_action :authenticate_server!

  def create
    missing_params = %i[user_id product_id count unit_price].select { |param| item_params[param].nil? }
    if missing_params.any?
      render json: { error: "Missing parameters: #{missing_params.join(', ')}" }, status: :bad_request
      return
    end

    data = CartItem.add_product(item_params)
    if data
      cart = data[:cart]
      InventoryProducer.update_cart_metrics(cart.product_id)
      render json: data, status: :created
    else
      render json: { errors: "creation failed" }, status: :unprocessable_entity
    end
  end

  private
  def item_params
    params.require(:item).permit(:user_id, :product_id, :count, :unit_price)
  end
end
