require 'faraday'

class BaseClient
  def initialize(base_url:, api_key: nil)
    @base_url = base_url
    @api_key = api_key
    @path = URI(@base_url).path
    @client = Faraday.new(url: base_url) do |f|
      f.request :json
      f.response :json
      f.adapter Faraday.default_adapter
      f.request :authorization, 'Bearer', @api_key if @api_key
    end
  end

  protected

  def build_path(path)
    if path.start_with?('/')
      path = path[1..-1]
    end

    if path.present? && path != '/'
      "#{@path}/#{path}"
    else
      @path
    end
  end

  def get(path, params = {})
    handle_response { @client.get(build_path(path), params) }
  end

  def post(path, body = {})
    handle_response { @client.post(build_path(path), body) }
  end

  def put(path, body = {})
    handle_response { @client.put(build_path(path), body) }
  end

  def patch(path, body = {})
    handle_response { @client.patch(build_path(path), body) }
  end

  def delete(path)
    handle_response { @client.delete(build_path(path)) }
  end

  private

  def handle_response
    response = yield
    case response.status
    when 200, 201, 204
      response.body
    when 404
      raise NotFoundError, "Resource not found"
    when 422
      raise ValidationError, response.body["errors"]
    else
      raise ApiError, "API request failed with status #{response.status}"
    end
  end
end

class ApiError < StandardError; end
class NotFoundError < ApiError; end
class ValidationError < ApiError; end
