class OrderContact < ApplicationRecord
  belongs_to :order

  validates :name, :email, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone, format: { with: /\A\+?\d+\z/ }, allow_nil: true
end
