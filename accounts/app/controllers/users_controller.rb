class UsersController < ApplicationController
  include AuthHelper

  def create
    required_params = %i[firstname lastname email phone password]
    missing_params = required_params.select { |param| user_params[param].blank? }

    if missing_params.any?
      render json: { error: "Missing required parameters: #{missing_params.join(', ')}" }, status: :bad_request
      return
    end

    user = User.new(user_params)
    if user.save
      login(user.id)
      user = user.as_json(only: %i[id email firstname lastname phone])
      render json: user, status: :created
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  private

  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :phone, :password)
  end
end
