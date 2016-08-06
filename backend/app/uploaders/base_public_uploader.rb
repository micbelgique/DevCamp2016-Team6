class BasePublicUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick
  include CarrierWave::MiniMagick

  storage :file

  VERY_LARGE = 100_000

  def store_dir
    "#{Rails.root}/public/system/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def cache_dir
    "system/tmp/carrierwave"
  end
end
