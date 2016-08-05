class Api::UserSpotLinksController < Api::BaseController
  def create
    if @user.present?
      @mission        = Mission.find(params[:mission_id])
      @spot           = @mission.spots.find(params[:spot_id])
      @user_spot_link = @spot.user_spot_links.where(:user_id => @user.id).first_or_initialize

      @user_spot_link.assign_attributes(strong_params)
      @user_spot_link.save!
    end

    render :nothing => true
  end

  private

  def strong_params
    params.require(:user_spot_link).permit(:picture)
  end
end
