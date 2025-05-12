Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  get "/", to: "home#index"
  delete "/", to: "home#destroy"
  resources :items, only: [:create, :update, :destroy] do
    collection do
      get :get_products_cart_items
    end
  end
end
