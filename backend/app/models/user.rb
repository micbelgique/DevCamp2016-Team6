class User < ApplicationRecord

  # Associations

  has_many :user_spot_links, :dependent => :destroy

end
