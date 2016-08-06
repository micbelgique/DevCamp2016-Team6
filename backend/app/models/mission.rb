class Mission < ApplicationRecord

  # Associations

  has_many :spots, :dependent => :destroy
  has_many :user_spot_links, :through => :spots

  # CarrierWave

  mount_uploader :picture, PictureUploader

  # Validation

  validates :name, :presence => { :message => "Le nom est obligatoire." }

end
