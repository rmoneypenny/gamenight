class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  include SessionsHelper


	before_action :require_login
  	
  	def require_login
  		if !self.current_user
			redirect_to index_path
		end
	end
end
