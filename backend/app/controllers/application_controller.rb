class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def set_flash_now_errors(object)
    if object.errors.any?
      flash.now[:alert] = object.errors.messages.values.join('<br />').html_safe
    end
  end
end
