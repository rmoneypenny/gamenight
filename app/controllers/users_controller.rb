class UsersController < ApplicationController

	def index

	end

	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)
		if !@user.save
			render 'new'
		else
			session[:user_id] = @user.id
			flash[:notice] = "Logged In"
			redirect_to index_path
		end
		
	end


	private

	def user_params
		params.permit(:username, :name, :email, :password, :password_confirmation)
	end

end
