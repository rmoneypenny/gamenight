class User < ApplicationRecord
	has_many :user_rooms
	has_many :rooms, :through => :user_rooms

	has_secure_password
	validates_email_format_of :email, :message => 'Invalid'
	validates :name, presence: true
	validates :email, presence: true
	validates :username, presence: true, uniqueness: true
	validates :password, presence: true
	
end
