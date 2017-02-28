module SessionsHelper

  def current_user
  	@current_user ||= User.find_by(id: session[:user_id])
  end

  def logged_in?
  	if @current_user
  		true
  	else
  		false
  	end
  end

end
