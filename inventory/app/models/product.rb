class Product < ApplicationRecord
  has_one :product_inventory
  has_one :product_cart
end
