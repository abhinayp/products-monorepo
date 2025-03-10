require "bcrypt"
class User < ApplicationRecord
  include BCrypt

  validates :email, presence: true, uniqueness: true
  validates :phone, presence: true, uniqueness: true

  def self.new(attributes = {})
    attributes[:password_digest] = Password.create(attributes.delete(:password)) if attributes[:password]
    super(attributes)
  end

  def authenticate(password)
    Password.new(password_digest) == password
  end
end
