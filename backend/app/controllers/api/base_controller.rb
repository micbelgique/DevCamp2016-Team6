class Api::BaseController < ApplicationController

  before_action :find_or_create_user

  def find_or_create_user
    device_id = params[:device_id].to_s.strip

    if device_id.present?
      @user = User.where(device_id: device_id).first_or_create
    end
  end

end
