module CartClient
  class HomeClient < CartClient::BaseClient
    def index(user_id)
      get("/?user_id=#{user_id}")
    end

    def destroy(user_id)
      delete("/", { user_id: user_id })
    end
  end
end
