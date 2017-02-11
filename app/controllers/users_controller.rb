class UsersController < ApplicationController

	def index

	end

	def new
			
	end

	def create
		user = User.new(user_params)
		puts user.valid?
		puts user.errors.messages
		#user.save
	end


	private

	def user_params
		params.permit(:username, :name, :email, :password, :password_confirmation)
	end

end
