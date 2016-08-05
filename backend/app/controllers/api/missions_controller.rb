class Api::MissionsController < Api::BaseController
  def index
    @missions = Mission.all
  end
end
