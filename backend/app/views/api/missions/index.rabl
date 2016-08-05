collection @missions
attributes :id, :name, :tagline, :description, :latitude, :longitude

node :picture do |mission|
  mission.picture.try(:url, :preview)
end
