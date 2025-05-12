module OrderModule
  class OrderHelper
    def self.create_order(order_shipping:, order_contact:, order_payment:)

      required_shipping_keys = [:street, :city, :state, :zip, :country]
      required_contact_keys = [:name, :email, :phone]
      required_payment_keys = [:card_number, :card_cvv, :card_expiration_date, :card_holder_name]

      order_shipping_missing_keys = required_shipping_keys - order_shipping.keys
      order_contact_missing_keys = required_contact_keys - order_contact.keys
      order_payment_missing_keys = required_payment_keys - order_payment.keys

      missing_keys = order_shipping_missing_keys + order_contact_missing_keys + order_payment_missing_keys

      if missing_keys.any?
        return { error: "Missing required shipping fields: #{missing_keys.join(', ')}" }
      end

      cart_data = CartClient::HomeClient.new.index(current_user['id'])
      metadata = cart_data[:cart_metadata]
      data = {
        total_price: metadata.net_total_price,
        tax: metadata.tax,
        gross_total_price: metadata.gross_total_price,
        user_id: current_user['id'],
        status: 'pending'
      }

      cart_items = cart_data[:cart]
      order_items = cart_items.map do |cart_item|
        {
          product_id: cart_item['product_id'],
          quantity: cart_item['count'],
          unit_price: cart_item['unit_price'],
          title: cart_item['title'],
          image_url: cart_item['image_url']
        }
      end

      order_shipping = {
        street: order_shipping[:street],
        city: order_shipping[:city],
        state: order_shipping[:state],
        zip: order_shipping[:zip],
        country: order_shipping[:country]
      }

      name = [order_contact[:first_name], order_contact[:last_name]].join(' ').strip
      order_contact = {
        name: name,
        email: order_contact[:email],
        phone: order_contact[:phone]
      }

      card_details = {
        card_number: order_payment[:card_number],
        card_cvv: order_payment[:card_cvv],
        card_expiration_date: order_payment[:card_expiration_date],
        card_holder_name: order_payment[:card_holder_name]
      }

      last_four_digits = card_details[:card_number].last(4)

      order_payment = {
        description: "Visa ending in #{last_four_digits}",
        street: order_payment[:street],
        city: order_payment[:city],
        state: order_payment[:state],
        zip: order_payment[:zip],
        country: order_payment[:country]
      }

      ActiveRecord::Base.transaction do
        @order = Order.create(data)
        @order.order_items.create(order_items)
        @order.order_shipping.create(order_shipping)
        @order.order_contact.create(order_contact)
        @order.order_payment.create(order_payment)
      end

      return @order
    end
  end
end
