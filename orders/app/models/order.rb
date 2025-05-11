class Order < ApplicationRecord
  has_many :order_items, dependent: :destroy
  has_many :order_status_histories, dependent: :destroy
  has_one :order_payment, dependent: :destroy
  has_one :order_shipping, dependent: :destroy
  has_one :order_contact, dependent: :destroy

  validates :total_price, :tax, :gross_total_price, :account_id, :status, presence: true
  validates :total_price, :tax, :gross_total_price, numericality: { greater_than_or_equal_to: 0 }
  validates :status, inclusion: { in: %w[pending payment_failed completed cancelled shipped delivered] }

  before_create :set_initial_status

  private

  def set_initial_status
    self.status ||= 'pending'
  end
end
