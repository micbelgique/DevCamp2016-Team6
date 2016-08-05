class Spot < ApplicationRecord

  # Associations

  belongs_to :mission

  has_many :user_spot_links, :dependent => :destroy

  # CarrierWave

  mount_uploader :logo, PictureUploader

end
