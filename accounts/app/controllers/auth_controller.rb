class AuthController < ApplicationController
  include AuthHelper

  def authorize
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      # sets cookie with access token and returns it in the response
      access_token = login(user.id)
      render json: { access_token: access_token }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def logout
    helpers.logout
    head :no_content
  end
end
