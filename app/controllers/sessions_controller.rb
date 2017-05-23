class SessionsController < ApplicationController

  skip_before_action :require_login


	def create
		user = User.where(username: params[:username].downcase).first
		if user && user.authenticate(params[:password])
			session[:user_id] = user.id
			flash[:notice] = "Logged In"
		else
			flash[:error] = "Invalid User/Pass"
		end
		redirect_to index_path
	end

	def destroy
		session.delete(:user_id)
		@current_user = nil
		redirect_to index_path
	end

end
