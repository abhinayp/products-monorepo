module PaymentModule
  module PaymentHelper
    def self.charge_order(order_id:)
      begin
        order = OrdersClient::HomeClient.new.show(order_id: order_id)
        order_details = order['order']
        payment = Payment.create(order_id: order_id, user_id: order_details['user_id'], amount: order_details['total_price'])
        payment.update(status: 'pending')
        sleep(10)
        payment.update(status: 'completed')
        PaymentsProducer.charged(order_id: order_id)
        payment
      rescue => e
        Rails.logger.error("Error charging order #{order_id}: #{e.message}")
        payment.update(status: 'failed') if payment
        PaymentsProducer.failed(order_id: order_id)
        payment
      end
    end
  end
end
