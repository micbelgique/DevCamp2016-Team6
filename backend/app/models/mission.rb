class Mission < ApplicationRecord

  # Associations

  has_many :spots

  # CarrierWave

  mount_uploader :picture, PictureUploader

  # Validation

  validates :name, :presence => { :message => "Le nom est obligatoire." }

end
