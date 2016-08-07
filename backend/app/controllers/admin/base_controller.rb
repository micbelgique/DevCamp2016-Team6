class Admin::BaseController < ApplicationController
  protect_from_forgery with: :exception
  layout 'admin'
  before_action :http_basic_auth

  private

  def http_basic_auth
    if Rails.env.production? && ENV['HTTP_BASIC_AUTH_USERNAME'].present?
      authenticate_or_request_with_http_basic do |username, password|
        username == ENV['HTTP_BASIC_AUTH_USERNAME'] &&
        password == ENV['HTTP_BASIC_AUTH_PASSWORD']
      end
    end
  end
end
