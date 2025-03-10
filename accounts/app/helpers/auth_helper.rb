module AuthHelper
  include ActionController::Cookies

  def login(user_id)
    access_token = generate_token(user_id)
    cookies[:_access_token] = {
      value: access_token,
      domain: :all,
      httponly: true,
      secure: Rails.env.production?
    }

    access_token
  end

  def logout
    cookies.delete(:_access_token, domain: :all)
  end

  def generate_token(user_id)
    private_key = OpenSSL::PKey::RSA.new(Rails.application.credentials.jwt_private_key)
    JWT.encode({ user_id: user_id }, private_key, 'RS256')
  end
end
