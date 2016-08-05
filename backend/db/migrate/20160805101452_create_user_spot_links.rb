class CreateUserSpotLinks < ActiveRecord::Migration[5.0]
  def change
    create_table :user_spot_links do |t|
      t.references :user, foreign_key: true
      t.references :spot, foreign_key: true
      t.string :picture

      t.timestamps
    end
  end
end
