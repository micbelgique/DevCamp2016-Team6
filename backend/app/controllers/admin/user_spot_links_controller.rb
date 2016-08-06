class Admin::UserSpotLinksController < Admin::BaseController
  def index
    @user_spot_links = UserSpotLink.where.not(:picture => nil)
                                   .order(:updated_at => :desc)
                                   .limit(100)
  end
end
