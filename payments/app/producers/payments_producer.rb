class PaymentsProducer
  def self.charged(order_id:)
    Karafka.producer.produce_async(
      topic: 'payments',
      payload: {
        event: 'payment_charged',
        status: 'success',
        order_id: order_id
      }.to_json
    )
  end

  def self.failed(order_id:)
    Karafka.producer.produce_async(
      topic: 'payments',
      payload: {
        event: 'payment_charged',
        status: 'failed',
        order_id: order_id
      }.to_json
    )
  end
end
