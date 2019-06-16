Class APIController < ActionController::Base
require '../config/api_keys.rb'
require 'rest_client'

headers = {
  :accept => 'application/json',
  :authorization => 'Token #{gws_api_key}'
}

response = RestClient.get 'https://api.globalwinescore.com/globalwinescores/latest/', headers
puts response

end
