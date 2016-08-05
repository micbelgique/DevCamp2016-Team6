class Admin::MissionsController < Admin::BaseController
  def index
    @missions = Mission.order(:name)
  end
end
