class OrderSerializer < ActiveModel::Serializer
  attributes :id, :total_price, :tax, :gross_total_price, :status, :created_at, :updated_at

  has_many :order_items
  has_one :order_payment
  has_one :order_shipping
  has_one :order_contact
  has_many :order_status_history

  class OrderItemSerializer < ActiveModel::Serializer
    attributes :id, :product_id, :title, :image_url, :quantity, :unit_price, :created_at
  end

  class OrderPaymentSerializer < ActiveModel::Serializer
    attributes :id, :payment_id, :description, :street, :address_line_2, :city, :state, :zip, :country
  end

  class OrderShippingSerializer < ActiveModel::Serializer
    attributes :id, :street, :address_line_2, :city, :state, :zip, :country,
               :tracking_number, :status, :carrier
  end

  class OrderContactSerializer < ActiveModel::Serializer
    attributes :id, :name, :email, :phone
  end

  class OrderStatusHistorySerializer < ActiveModel::Serializer
    attributes :id, :status, :created_at
  end
end
