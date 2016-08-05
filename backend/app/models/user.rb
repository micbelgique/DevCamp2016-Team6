class User < ApplicationRecord

  # Associations

  has_many :user_spot_links, :dependent => :destroy
  has_many :spots, :through => :user_spot_links
  has_many :missions, :through => :spots

end
