class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    @orders = Order.where(user_id: current_user['id'])
  end

  def show
    @order = Order.find(params[:id])
  end

  def create
    order_shipping = params[:order][:order_shipping]
    order_contact = params[:order][:order_contact]
    order_payment = params[:order][:order_payment]

    order_data = OrderModule::OrderHelper.create_order(order_shipping: order_shipping, order_contact: order_contact, order_payment: order_payment, user_id: current_user['id'])
    if order_data[:error]
      render json: { error: order_data[:error] }, status: :bad_request
      return
    end

    CartClient::HomeClient.new.destroy(current_user['id'])

    render json: order_data, status: :created
  end

  private

  def order_params
    params.require(:order).permit(:order_payment, :order_shipping, :order_contact)
  end
end
