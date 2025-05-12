# frozen_string_literal: true

# Example consumer that prints messages payloads
class PaymentsConsumer < ApplicationConsumer
  def consume
    messages.each do |message|
      if message.payload['event'] == 'payment_charged'
        order_id = message.payload['order_id']
        if message.payload['status'] == 'success'
          Order.find(order_id).update_status('completed')
        else
          Order.find(order_id).update_status('payment_failed')
        end
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
