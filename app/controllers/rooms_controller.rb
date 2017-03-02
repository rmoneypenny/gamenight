class RoomsController < ApplicationController
  def index
  end

  def new
   @room = Room.new
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

  def create
    @room = Room.new(room_params)
    if !@room.save
      render 'new'
    else
      redirect_to index_path
    end
  end

  private

    def room_params
      params.permit(:admin, :password, :password_confirmation)
    end

end
