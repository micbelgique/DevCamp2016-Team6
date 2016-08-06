class PictureUploader < BasePublicUploader
  def extension_white_list
    %w(png jpg jpeg)
  end

  version :preview do
    process :resize_to_fit => [400, 200]
  end

  version :tiny do
    process :resize_to_fit => [100, 50]
  end

  version :sketch do
    process :sketchize => [400, 200]
  end

  version :tiny_sketch do
    process :sketchize => [100, 50]
  end

  private

  def sketchize(width, height)
    manipulate! do |img|
      img.combine_options do |c|
        c.resize      "#{width}x#{height}>"
        c.resize      "#{width}x#{height}<"

        c.edge "1"
        c.negate
        c.normalize
        c.colorspace "Gray"
        c.blur "0x.5"
        c.contrast_stretch "0x50%"
      end

      img
    end
  end
end
