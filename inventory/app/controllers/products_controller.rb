class ProductsController < ApplicationController
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

  private
  def get_inventory(product)
    {
      available_count: product.product_inventory.available_count,
      hold_count: product.product_inventory.hold_count,
      sold_count: product.product_inventory.sold_count
    }
  end
end
