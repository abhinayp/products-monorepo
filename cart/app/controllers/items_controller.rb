class ItemsController < ApplicationController
  before_action :authenticate_server!, only: [:create]
  before_action :authenticate_user!, only: [:update, :destroy]
  before_action :has_item_access_to_user, only: [:update, :destroy]

  def create
    missing_params = %i[user_id product_id count unit_price].select { |param| item_params[param].nil? }
    if missing_params.any?
      render json: { error: "Missing parameters: #{missing_params.join(', ')}" }, status: :bad_request
      return
    end

    data = CartItem.add_product(item_params)
    if data
      cart = data[:cart]
      CartProducer.update_metrics(product_id: cart.product_id, new_item_count: item_params['count'])
      render json: data, status: :created
    else
      render json: { errors: "creation failed" }, status: :unprocessable_entity
    end
  end

  def update
    missing_params = %i[count].select { |param| item_params[param].nil? }
    if missing_params.any?
      render json: { error: "Missing parameters: #{missing_params.join(', ')}" }, status: :bad_request
      return
    end

    if !params[:id]
      render json: { error: "Missing parameters: id" }, status: :bad_request
      return
    end

    data = CartItem.update_item(id: params[:id], count: item_params['count'])
    if data
      cart = data[:cart]
      new_item_count = item_params['count'] - @item.count
      CartProducer.update_metrics(product_id: cart.product_id, new_item_count: new_item_count)
      render json: data, status: :ok
    else
      render json: { errors: "update failed" }, status: :unprocessable_entity
    end
  end

  def destroy
    missing_params = %i[product_id].select { |param| item_params[param].nil? }
    if !params[:id]
      render json: { error: "Missing parameters: id" }, status: :bad_request
      return
    end

    data = CartItem.remove_product(params[:id])
    if data
      cart = data[:cart]
      CartProducer.update_metrics(product_id: cart.product_id, new_item_count: -1 * @item.count)
      render json: data, status: :ok
    else
      render json: { errors: "deletion failed" }, status: :unprocessable_entity
    end
  end

  private
  def has_item_access_to_user
    @item ||= CartItem.find(params[:id])
    if @item.user_id != current_user['id']
      render json: { error: "Unauthorized" }, status: :unauthorized
      return
    end
  end

  def item_params
    params.require(:item).permit(:user_id, :product_id, :count, :unit_price)
  end
end
