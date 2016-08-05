collection @missions
attributes :id, :name, :description

node :picture do |mission|
  mission.picture.try(:url, :preview)
end
