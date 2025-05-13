module OrderModule
  class OrderHelper
    def self.create_order(order_shipping:, order_contact:, order_payment:, user_id:)

      # Input validation
      required_shipping_keys = [:street, :city, :state, :zip, :country]
      required_contact_keys = [:first_name, :last_name, :email, :phone]
      required_payment_keys = [:card_number, :card_cvv, :card_expiration_date, :card_holder_name, :street, :city, :state, :zip, :country]

      order_shipping_missing_keys = required_shipping_keys - order_shipping.keys.map(&:to_sym)
      order_contact_missing_keys = required_contact_keys - order_contact.keys.map(&:to_sym)
      order_payment_missing_keys = required_payment_keys - order_payment.keys.map(&:to_sym)

      missing_keys = order_shipping_missing_keys + order_contact_missing_keys + order_payment_missing_keys

      # If missing required data, return error
      if missing_keys.any?
        return { error: "Missing required fields: #{missing_keys.join(', ')}" }
      end

      # Get cart data of the user from cart service
      cart_data = CartClient::HomeClient.new.index(user_id)
      metadata = cart_data["cart_metadata"]

      # If cart data is missing, return error
      if metadata.blank? || metadata["net_total_price"].blank? || metadata["tax"].blank? || metadata["gross_total_price"].blank?
        return { error: "Cart data is missing" }
      end

      # Create order data with cart data
      data = {
        total_price: metadata["net_total_price"],
        tax: metadata["tax"],
        gross_total_price: metadata["gross_total_price"],
        user_id: user_id,
        status: 'pending'
      }

      # Create order items with cart items
      cart_items = cart_data["cart"]
      order_items = cart_items.map do |cart_item|
        {
          product_id: cart_item['product_id'],
          quantity: cart_item['count'],
          unit_price: cart_item['unit_price'],
          title: cart_item['product']['title'],
          image_url: cart_item['product']['image_url']
        }
      end

      # Create order shipping with order shipping data
      order_shipping = {
        street: order_shipping[:street],
        city: order_shipping[:city],
        state: order_shipping[:state],
        zip: order_shipping[:zip],
        country: order_shipping[:country]
      }

      # Create order contact with order contact data
      name = [order_contact[:first_name], order_contact[:last_name]].join(' ').strip
      order_contact = {
        name: name,
        email: order_contact[:email],
        phone: order_contact[:phone]
      }

      # Create order payment with order payment data
      card_details = {
        card_number: order_payment[:card_number],
        card_cvv: order_payment[:card_cvv],
        card_expiration_date: order_payment[:card_expiration_date],
        card_holder_name: order_payment[:card_holder_name]
      }

      # Get last four digits of the card number
      last_four_digits = card_details[:card_number].last(4)

      order_payment = {
        description: "Visa ending in #{last_four_digits}",
        street: order_payment[:street],
        city: order_payment[:city],
        state: order_payment[:state],
        zip: order_payment[:zip],
        country: order_payment[:country]
      }

      # Create order and store order items, order shipping, order contact, order payment
      ActiveRecord::Base.transaction do
        @order = Order.create(data)
        @order.order_items.create(order_items)
        @order.order_shipping = OrderShipping.new(order_shipping)
        @order.order_contact = OrderContact.new(order_contact)
        @order.order_payment = OrderPayment.new(order_payment)
        @order.save!
      end

      # Produce order created event
      OrdersProducer.created(order_id: @order.id)

      return { order: @order }
    end
  end
end
