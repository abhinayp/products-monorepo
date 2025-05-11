class OrderPayment < ApplicationRecord
  belongs_to :order

  validates :payment_id, presence: true, uniqueness: true
  validates :street, :city, :state, :zip, :country, presence: true
  validates :description, presence: true
end
