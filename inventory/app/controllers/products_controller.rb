class ProductsController < ApplicationController
  before_action :authenticate_user!, only: [:add_to_cart]
  before_action :authenticate_server!, only: [:get_all_products]

  def index
    page = params[:page] || 1
    user_id = current_user['id'] if current_user.present?
    products_data = ProductsModule::ProductsHelper.get_products_data(user_id: user_id)
    render json: products_data
  end

  def show
    data = ProductsModule::ProductsHelper.get_product_data(params[:id])
    render json: data
  end

  def add_to_cart
    product = Product.find(params[:id])

    if product.blank?
      render json: { error: 'Product not found' }, status: :not_found
      return
    end

    item = CartClient::ItemsClient.new.create({
      user_id: current_user['id'],
      product_id: params[:id],
      count: 1,
      unit_price: product.price
    })
    render json: item[:cart]
  end

  def get_all_products
    product_ids = params[:ids].split(',')
    products = Product.where(id: product_ids)
    render json: products
  end
end
