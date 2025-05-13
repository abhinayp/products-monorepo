class Payment < ApplicationRecord
  has_many :payment_status_histories, dependent: :destroy

  validates :order_id, :user_id, :amount, :status, presence: true
  validates :amount, numericality: { greater_than: 0 }
  validates :status, inclusion: { in: %w[pending processing completed failed refunded] }

  before_create :set_initial_status
  after_create :create_status_history

  private

  def set_initial_status
    self.status ||= 'pending'
  end

  def create_status_history
    payment_status_histories.create(status: status)
  end
end
