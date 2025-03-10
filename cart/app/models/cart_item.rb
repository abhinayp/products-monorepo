class CartItem < ApplicationRecord
  def self.add_product(attributes)
    ActiveRecord::Base.transaction do
      cart = CartItem.find_or_create_by(user_id: attributes[:user_id], product_id: attributes[:product_id])
      cart.count = 0 if cart.count.nil?
      cart.count += attributes[:count]
      cart.unit_price = attributes[:unit_price]

      cart_metadata = CartMetadata.find_or_create_by(user_id: cart.user_id)
      cart_metadata.gross_total_price = 0 if cart_metadata.gross_total_price.nil?
      cart_metadata.tax = 0 if cart_metadata.tax.nil?
      cart_metadata.net_total_price = 0 if cart_metadata.net_total_price.nil?
      cart_metadata.gross_total_price += cart.unit_price * cart.count
      cart_metadata.tax = cart_metadata.gross_total_price * 0.1
      cart_metadata.net_total_price = cart_metadata.gross_total_price + cart_metadata.tax
      cart_metadata.save!
      cart.save!

      return {
        cart: cart,
        cart_metadata: cart_metadata
      }
    end
  end

  def self.remove_item(id)
    ActiveRecord::Base.transaction do
      cart = CartItem.find(id)
      return nil if cart.nil?

      cart_metadata = CartMetadata.find_by(user_id: cart.user_id)
      cart_metadata.gross_total_price -= cart.unit_price * cart.count
      cart_metadata.tax = cart_metadata.gross_total_price * 0.1
      cart_metadata.net_total_price = cart_metadata.gross_total_price + cart_metadata.tax
      cart_metadata.save!
      cart.destroy

      return {
        cart: cart,
        cart_metadata: cart_metadata
      }
    end
  end

  def self.update_item(attributes)
    if attributes[:count] == 0
      return remove_product(attributes)
    end

    ActiveRecord::Base.transaction do
      cart = CartItem.find(attributes[:id])
      return nil if cart.nil?

      cart_metadata = CartMetadata.find_by(user_id: cart.user_id)
      cart_metadata.gross_total_price -= cart.unit_price * cart.count
      cart_metadata.tax = cart_metadata.gross_total_price * 0.1
      cart_metadata.net_total_price = cart_metadata.gross_total_price + cart_metadata.tax

      cart.count = attributes[:count]
      cart.save!

      cart_metadata.gross_total_price += cart.unit_price * cart.count
      cart_metadata.tax = cart_metadata.gross_total_price * 0.1
      cart_metadata.net_total_price = cart_metadata.gross_total_price + cart_metadata.tax

      cart_metadata.save!

      return {
        cart: cart,
        cart_metadata: cart_metadata
      }
    end
  end
end
