class ConvertLatLongTypes < ActiveRecord::Migration[5.0]
  def change
    change_column :missions, :latitude,  :decimal, { :precision => 12, :scale => 8 }
    change_column :missions, :longitude, :decimal, { :precision => 12, :scale => 8 }
    change_column :spots,    :latitude,  :decimal, { :precision => 12, :scale => 8 }
    change_column :spots,    :longitude, :decimal, { :precision => 12, :scale => 8 }
  end
end
