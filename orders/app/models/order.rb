class Order < ApplicationRecord
  has_many :order_items, dependent: :destroy
  has_many :order_status_history, dependent: :destroy
  has_one :order_payment, dependent: :destroy
  has_one :order_shipping, dependent: :destroy
  has_one :order_contact, dependent: :destroy

  validates :total_price, :tax, :gross_total_price, :user_id, :status, presence: true
  validates :total_price, :tax, :gross_total_price, numericality: { greater_than_or_equal_to: 0 }
  validates :status, inclusion: { in: %w[pending payment_failed completed cancelled shipped delivered] }

  before_create :set_initial_status
  after_create :create_status_history


  def update_status(status)
    self.update(status: status)
    OrderStatusHistory.create(order: self, status: status)
  end


  private

  def set_initial_status
    self.status ||= 'pending'
  end

  def create_status_history
    OrderStatusHistory.create(order: self, status: self.status)
  end
end
