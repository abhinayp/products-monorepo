class HomeController < ApplicationController
  before_action :authenticate_server_or_user!, only: [:index, :clear_cart]

  def index
    user_id = current_user['id'] if @authorization_type == 'user'
    user_id = params[:user_id] if @authorization_type == 'server'

    if user_id.blank?
      render json: { error: 'User ID is required' }, status: :bad_request
      return
    end

    data = CartModule::CartHelper.get_cart_data(page: params[:page], user_id: user_id)
    render json: data
  end

  def destroy
    user_id = current_user['id'] if @authorization_type == 'user'
    user_id = params[:user_id] if @authorization_type == 'server'

    if user_id.blank?
      render json: { error: 'User ID is required' }, status: :bad_request
      return
    end

    data = CartModule::CartHelper.clear_cart(user_id: user_id)
    if data[:success]
      render json: data, status: :ok
    else
      render json: { error: "Failed to clear cart" }, status: :unprocessable_entity
    end
  end
end
