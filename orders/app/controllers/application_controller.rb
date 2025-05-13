class ApplicationController < ActionController::API
  include ActionController::Cookies
  CODE = "Bearer password"

  def authenticate_server!
    authorization_header = request.headers['Authorization']
    head :unauthorized unless authorization_header == CODE
    @authorization_type = 'server'
  end

  def authenticate_user!
    head :unauthorized unless current_user
    @authorization_type = 'user'
  end

  def authenticate_server_or_user!
    authorization_header = request.headers['Authorization']

    head :unauthorized unless authorization_header == CODE || current_user

    if authorization_header == CODE
      @authorization_type = 'server'
    else
      @authorization_type = 'user'
    end
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
