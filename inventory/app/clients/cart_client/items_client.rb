module CartClient
  class ItemsClient < CartClient::BaseClient
    def create(item)
      post('/items', item)
    end
  end
end
