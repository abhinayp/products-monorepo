class OrderPayment < ApplicationRecord
  belongs_to :order

  validates :street, :city, :state, :zip, :country, presence: true
  validates :description, presence: true
end
