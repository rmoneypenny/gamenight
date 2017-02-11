class User < ApplicationRecord
	has_many :user_rooms
	has_many :rooms, :through => :user_rooms

	has_secure_password
	validates :name, presence: true
	validates :email, presence: true
	validates :username, presence: true
	validates :password, presence: true
	
end
