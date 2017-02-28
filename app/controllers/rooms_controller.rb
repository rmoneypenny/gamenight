class RoomsController < ApplicationController
  def index
  end

  def new

	@calendar = Calendar.new  
  
  if params[:prevMonth]
    @month = Calendar.new(params[:prevMonth])
    puts "prev"
  end
  if params[:nextMonth]
    @month = Calendar.new(params[:nextMonth])
    puts "next"
  end
  
  	respond_to do |format|
  		format.html
  		format.js 
  	end
  end

end
