module InventoryClient
  class BaseClient < BaseClient
    def initialize
      super(base_url: "http://api-gateway/inventory", api_key: "password")
    end
  end
end
