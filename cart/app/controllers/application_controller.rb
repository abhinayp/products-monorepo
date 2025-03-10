class ApplicationController < ActionController::API
  include ActionController::Cookies

  def authenticate_user!
    head :unauthorized unless current_user
  end

  def current_user
    return @current_user if defined?(@current_user)
    return nil unless cookies[:_access_token]

    access_token = cookies[:_access_token]
    public_key = OpenSSL::PKey::RSA.new(Rails.application.credentials.auth_public_key)
    decoded_token = JWT.decode(access_token, public_key, true, { algorithm: 'RS256' })[0]
    @current_user = {
      "id" => decoded_token['user_id']
    }
  rescue JWT::DecodeError
    nil
  end
end
