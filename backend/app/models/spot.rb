class Spot < ApplicationRecord

  # Associations

  belongs_to :mission

  has_many :user_spot_links, :dependent => :destroy

  # CarrierWave

  mount_uploader :picture, PictureUploader

  # Validation

  validates :name, :presence => { :message => "Le nom est obligatoire." }

  # Methods

  def geolocalized?
    latitude.present? && longitude.present?
  end

end
