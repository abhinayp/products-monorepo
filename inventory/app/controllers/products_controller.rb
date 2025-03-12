class ProductsController < ApplicationController
  before_action :authenticate_user!, only: [:add_to_cart]
  before_action :authenticate_server!, only: [:get_all_products]

  def index
    page = params[:page] || 1
    products = Product.includes(:product_inventory)
    products_with_inventory = products.map { |product| product.as_json.merge(get_inventory(product)) }
    render json: products_with_inventory
  end

  def show
    product = Product.includes(:product_inventory).find(params[:id])
    product_with_inventory = product.as_json.merge(get_inventory(product))
    render json: product_with_inventory
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

  private
  def get_inventory(product)
    {
      available_count: product.product_inventory.available_count,
      hold_count: product.product_inventory.hold_count,
      sold_count: product.product_inventory.sold_count
    }
  end
end
