class PaymentStatusHistory < ApplicationRecord
  belongs_to :payment

  validates :status, presence: true
  validates :status, inclusion: { in: %w[pending processing completed failed refunded] }
end
