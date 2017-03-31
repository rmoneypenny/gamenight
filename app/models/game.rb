class Game < ApplicationRecord

	belongs_to :room

	validates :name, presence: true
	validates :weight, presence: true
	validates :room_id, presence: true


	def submit(names, vote, weight, room_id)
		names.each do |n|
			vote ||= false
			game = Game.new(:name => n.chomp, :vote => vote, :weight => weight, :room_id => room_id)
			game.save
		end
	end

	def multiUpdate(gameIDs, gameWeights)
		for i in 0..gameIDs.length-1
			Game.update(gameIDs[i], :weight => gameWeights[i])
		end

	end
end
