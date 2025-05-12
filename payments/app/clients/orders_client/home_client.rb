module OrdersClient
  class HomeClient < OrdersClient::BaseClient
    def show(order_id:)
      get("/#{order_id}")
    end
  end
end
