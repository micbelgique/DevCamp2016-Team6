collection @spots
attributes :id, :name

node :picture do |spot|
  spot.picture.try(:url)
end
