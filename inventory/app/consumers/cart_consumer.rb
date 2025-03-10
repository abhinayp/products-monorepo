# frozen_string_literal: true

# Inventory consumer that prints messages payloads
class CartConsumer < ApplicationConsumer
  def consume
    messages.each do |message|
      payload = message.payload
      product_cart = ProductCart.find_or_create_by(product_id: payload['product_id'])
      product_cart.user_count = payload['user_count']
      product_cart.item_count = 0 if product_cart.item_count.nil?
      product_cart.item_count += payload['new_item_count'] if payload['new_item_count']
      product_cart.save
    end
  end

  # Run anything upon partition being revoked
  # def revoked
  # end

  # Define here any teardown things you want when Karafka server stops
  # def shutdown
  # end
end
