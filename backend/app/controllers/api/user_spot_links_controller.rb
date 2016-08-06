class Api::UserSpotLinksController < Api::BaseController
  def create
    if @user.present?
      @mission        = Mission.find(params[:mission_id])
      @spot           = @mission.spots.find(params[:spot_id])
      @user_spot_link = @spot.user_spot_links.where(:user_id => @user.id).first_or_initialize

      tmp_path = "#{Rails.root}/tmp/#{UUIDTools::UUID.random_create}.pdf"
      data     = Base64.decode64(params[:user_spot_link][:picture])

      File.open(tmp_path, 'b') do |file|
        file.write(data)
      end

      # @user_spot_link.picture = data
      # @user_spot_link.save!

      # FileUtils.rm(tmp_path)
    end

    render :nothing => true
  end
end
