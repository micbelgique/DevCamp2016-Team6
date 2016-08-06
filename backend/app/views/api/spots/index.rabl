collection @spots
attributes :id, :name, :description, :latitude, :longitude

node :picture do |spot|
  spot.picture.try(:url, :preview)
end

node :own_picture do |spot|
  user_spot_link = spot.user_spot_links.where(:user_id => @user.id).first
  user_spot_link.try(:picture).try(:url, :sketch)
end

node :geolocalized do |spot|
  spot.geolocalized?
end
