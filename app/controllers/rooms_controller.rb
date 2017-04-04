class RoomsController < ApplicationController

  include SessionsHelper

  def index
  end

  def new
   @room = Room.new
   @calendar = Calendar.new
   @game = Game.new
   @ownedRooms = Room.where(:admin => current_user.id)


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
    @ownedRooms = Room.where(:admin => current_user.id)

    if game_params[:name].size==0 || !@room.save 
      @error = game_params[:name].size==0 ? ("There must be at least one game entered"):(nil)
      render 'new'
    else
      @game = Game.new
      @game.submit(game_params[:name], game_params[:vote], game_params[:weight], @room.id)
      redirect_to index_path
    end
  end

  def update
    valid = params.permit(:room_id, :password, datetime: [:year, :month, :day, :hour, :minute] )
    dt = DateTime.new(valid[:datetime][:year].to_i, valid[:datetime][:month].to_i, valid[:datetime][:day].to_i, valid[:datetime][:hour].to_i, valid[:datetime][:minute].to_i)
    @room = Room.find_by(:id => valid[:room_id])
    @ownedRooms = Room.where(:admin => current_user.id)

    if @room.authenticate(valid[:password])
      @room.update(:datetime => dt, :password => valid[:password])
      @message = "Updated"
      render 'new'
    else
      @error = "Invalid Password"
      render 'new'
    end
  end

  def destroy
    @ownedRooms = Room.where(:admin => current_user.id)
    @room = Room.find_by(:id => params[:room_id])
    userroom = UserRoom.where(:room_id => params[:room_id])
    games = Game.where(:room_id => params[:room_id])
    if @room.authenticate(params[:password])
      @message = "Deleted"

      userroom.destroy_all
      @room.destroy
      games.destroy_all
      render 'new'
    else
      @error = "Invalid Password"
      render 'new'
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

    game = Game.new
    gameIDs = params[:games]
    gameWeights = params[:weights]
    userroom = UserRoom.find_by(:room_id => params[:room], :user_id => params[:user])
    userroom.update(:vote => true)
    game.multiUpdate(gameIDs, gameWeights)
    redirect_to index_path

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
