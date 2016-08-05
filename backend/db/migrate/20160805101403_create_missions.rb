class CreateMissions < ActiveRecord::Migration[5.0]
  def change
    create_table :missions do |t|
      t.string :name
      t.string :description
      t.string :picture

      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
