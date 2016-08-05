collection @missions
attributes :id, :name

node :picture do |mission|
  mission.picture.try(:url)
end
