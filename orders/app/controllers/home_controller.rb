
class HomeController < ApplicationController
  before_action :authenticate_user!, only: [:index, :status_history, :create]
  before_action :authenticate_server_or_user!, only: [:show]

  def index
    orders = Order.where(user_id: current_user['id']).joins(:order_items).group('orders.id').order('orders.created_at DESC')

    render json: orders, each_serializer: OrderSerializer, include: [
      :order_items,
    ]
  end

  def show
    @order = Order.find(params[:id])
    if @order.user_id != current_user['id']
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end

    render json: {
      order: @order,
      order_items: @order.order_items,
      order_shipping: @order.order_shipping,
      order_contact: @order.order_contact,
      order_payment: @order.order_payment
    }
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

  def status_history
    @order = Order.find(params[:id])
    if @order.user_id != current_user['id']
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end

    render json: @order.order_status_history, status: :ok
  end

  private

  def order_params
    params.require(:order).permit(:order_payment, :order_shipping, :order_contact)
  end
end
