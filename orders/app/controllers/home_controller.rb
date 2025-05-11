class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    @orders = Order.where(user_id: current_user['id'])
  end

  def show
    @order = Order.find(params[:id])
  end

  def create
    @order = Order.create(order_params)
  end

  private

  def order_params
    params.require(:order).permit(:status, :cart_id, :order_payment, :order_shipping, :order_contact)
  end
end
