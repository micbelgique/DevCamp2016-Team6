collection @missions
attributes :id, :name, :tagline, :description, :latitude, :longitude

node :picture do |mission|
  mission.picture.try(:url, :preview)
end

node :spots_count do |mission|
  mission.spots.count
end

node :own_spots_count do |mission|
  mission.user_spot_links.where(:user_id => @user.id)
                         .where.not(:picture => nil)
                         .count
end
