class UserRoom < ApplicationRecord
	belongs_to :user
	belongs_to :room

	validates_uniqueness_of :user_id, scope: :room_id, :message => "You have already joined"
	
end
