module CartClient
  class BaseClient < BaseClient
    def initialize
      super(base_url: "#{ENV['API_GATEWAY_HOST']}/cart", api_key: "password")
    end
  end
end
