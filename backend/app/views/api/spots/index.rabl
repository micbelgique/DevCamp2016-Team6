collection @spots
attributes :id, :name, :description, :latitude, :longitude

node :picture do |spot|
  spot.picture.try(:url, :preview)
end
