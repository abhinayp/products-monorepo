class CartProducer
  def self.update_metrics product_id:, new_item_count:
    user_count = CartItem.where(product_id: product_id).distinct.count(:user_id)

    Karafka.producer.produce_async(
      topic: 'cart',
      payload: {
        event: 'update_metrics',
        product_id: product_id,
        new_item_count: new_item_count,
        user_count: user_count
      }.to_json
    )
  end
end
