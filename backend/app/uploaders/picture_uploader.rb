class PictureUploader < BasePublicUploader
  def extension_white_list
    %w(png jpg jpeg)
  end

  version :preview do
    process :resize_to_fit => [400, 200]
  end
end
