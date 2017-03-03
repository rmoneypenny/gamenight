class Room < ApplicationRecord
	has_many :user_rooms
	has_many :users, :through => :user_rooms

	has_secure_password
	validates :admin, presence: true
	validates :password, presence: true
	validates :datetime, presence: true
end
