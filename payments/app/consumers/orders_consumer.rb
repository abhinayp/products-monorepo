# frozen_string_literal: true

# Example consumer that prints messages payloads
class OrdersConsumer < ApplicationConsumer
  def consume
    messages.each do |message|
      if message.payload['event'] == 'order_created'
        order_id = message.payload['order_id']
        PaymentModule::PaymentHelper.charge_order(order_id: order_id)
      end
    end
  end

  # Run anything upon partition being revoked
  # def revoked
  # end

  # Define here any teardown things you want when Karafka server stops
  # def shutdown
  # end
end
