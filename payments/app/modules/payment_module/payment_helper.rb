module PaymentModule
  module PaymentHelper
    def self.charge_order(order_id:)
      begin
        # Get order details from orders service
        order = OrdersClient::HomeClient.new.show(order_id: order_id)
        order_details = order['order']

        # Create payment
        payment = Payment.create(order_id: order_id, user_id: order_details['user_id'], amount: order_details['total_price'])
        payment.update(status: 'pending')

        # mock payment processing delay by waiting 10 seconds
        sleep(10)

        # Update payment status to completed
        payment.update(status: 'completed')

        # Produce charged event to payments service
        PaymentsProducer.charged(order_id: order_id)

        # Return payment
        payment
      rescue => e
        # Log error
        Rails.logger.error("Error charging order #{order_id}: #{e.message}")

        # Update payment status to failed
        payment.update(status: 'failed') if payment

        # Produce failed event to payments service
        PaymentsProducer.failed(order_id: order_id)

        # Return payment
        payment
      end
    end
  end
end
