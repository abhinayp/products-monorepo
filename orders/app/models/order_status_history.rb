class OrderStatusHistory < ApplicationRecord
  belongs_to :order

  validates :status, presence: true
  validates :status, inclusion: { in: %w[pending payment_failed completed cancelled shipped delivered] }
end
