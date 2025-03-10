# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require 'net/http'
require 'json'

url = URI.parse('https://fakestoreapi.com/products')
response = Net::HTTP.get_response(url)
products = JSON.parse(response.body)

products.each do |product_data|
  product = Product.find_or_create_by!(
    title: product_data['title'],
    price: product_data['price'],
    description: product_data['description'],
    category: product_data['category'],
    image_url: product_data['image']
  )

  ProductInventory.find_or_create_by!(
    product: product,
    available_count: rand(1..100), # Assuming you want to add a random quantity for each product
    hold_count: 0,
    sold_count: 0
  )
end
