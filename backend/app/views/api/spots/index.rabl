collection @spots
attributes :id, :name, :description

node :picture do |spot|
  spot.picture.try(:url, :preview)
end
