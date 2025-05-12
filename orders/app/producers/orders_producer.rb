class OrdersProducer
  def self.created(order_id:)
    Karafka.producer.produce_async(topic: 'orders', payload: { event: 'order_created', order_id: order_id }.to_json)
  end

  def self.updated(order_id:)
    Karafka.producer.produce_async(topic: 'orders', payload: { event: 'order_updated', order_id: order_id }.to_json)
  end
end
