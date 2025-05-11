class OrderShipping < ApplicationRecord
  belongs_to :order

  validates :street, :city, :state, :zip, :country, presence: true
  validates :status, inclusion: { in: %w[pending shipped delivered] }, allow_nil: true
  validates :carrier, presence: true, if: :tracking_number?
end
