class RoomsController < ApplicationController
  def index
  end

  def new
   @room = Room.new
   @calendar = Calendar.new
   @game = Game.new
  
    if params[:prevMonth]
      @month = Calendar.new(params[:prevMonth])
    end
    
    if params[:nextMonth]
      @month = Calendar.new(params[:nextMonth])
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
      @game = Game.new
      @game.submit(game_params[:name], game_params[:vote], game_params[:weight], @room.id)
      redirect_to index_path
    end
  end

  def userroom
    @ur = UserRoom.new    
  end

  def createur

    @ur = UserRoom.new(userroom_params)
    if !@ur.save
      render 'userroom'
    else
      redirect_to index_path
    end
  end

  def updateur

  end
  
  private

    def room_params
      valid = params.permit(:admin, :password, :password_confirmation, datetime: [:year, :month, :day, :hour, :minute] )
      dt = DateTime.new(valid[:datetime][:year].to_i, valid[:datetime][:month].to_i, valid[:datetime][:day].to_i, valid[:datetime][:hour].to_i, valid[:datetime][:minute].to_i)
      valid.delete(:datetime)
      valid.merge!(:datetime => dt)
    end

    def game_params
      valid = params.permit(:name, :vote, :weight, :room_id)
      names = valid[:name].split("\n")
      valid.delete(:name)
      valid.merge!(:name => names)
    end

    def userroom_params
      params.permit(:user_id, :room_id)
    end

end
