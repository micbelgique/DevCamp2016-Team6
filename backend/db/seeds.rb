fagnes = Mission.create!(
  name: "Domaine de Hautes Fagnes",
  picture: File.new("misc/bootstrap/pictures/fagnes.jpg")
)

ardennes = Mission.create!(
  name: "Azur en Ardennes",
  picture: File.new("misc/bootstrap/pictures/ardennes.jpg")
)

fagnes.spots.create!(
  name: "Mini-golf",
  picture: File.new("misc/bootstrap/pictures/golf.jpg")
)

fagnes.spots.create!(
  name: "Piscine",
  picture: File.new("misc/bootstrap/pictures/golf.jpg")
)

fagnes.spots.create!(
  name: "Sauna",
  picture: File.new("misc/bootstrap/pictures/golf.jpg")
)

fagnes.spots.create!(
  name: "Fred",
  picture: File.new("misc/bootstrap/pictures/golf.jpg")
)

fagnes.spots.create!(
  name: "Chambre de Valentin Taleb",
  picture: File.new("misc/bootstrap/pictures/golf.jpg")
)
