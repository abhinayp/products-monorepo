module OrdersClient
  class BaseClient < BaseClient
    def initialize
      super(base_url: "#{ENV['API_GATEWAY_HOST']}/orders", api_key: "password")
    end
  end
end
