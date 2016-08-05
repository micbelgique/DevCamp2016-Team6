class Admin::SpotsController < Admin::BaseController

  before_action :find_mission

  def index
    @spots = @mission.spots.order(:name)
  end

  def new
    @spot = @mission.spots.new
    render 'form'
  end

  def create
    @spot = @mission.spots.new(strong_params)

    if @spot.save
      redirect_to admin_mission_spots_path(@mission)
    else
      set_flash_now_errors(@spot)
      render 'form'
    end
  end

  def edit
    @spot = @mission.spots.find(params[:id])
    render 'form'
  end

  def update
    @spot = @mission.spots.find(params[:id])

    if @spot.update_attributes(strong_params)
      redirect_to admin_mission_spots_path(@mission)
    else
      set_flash_now_errors(@spot)
      render 'form'
    end
  end

  def destroy
    @spot = @mission.spots.find(params[:id])
    @spot.destroy
    redirect_to admin_mission_spots_path(@mission)
  end

  private

  def find_mission
    @mission = Mission.find(params[:mission_id])
  end

  def strong_params
    params.require(:spot).permit(
      :name, :description, :picture, :picture_cache, :latitude, :longitude
    )
  end
end
