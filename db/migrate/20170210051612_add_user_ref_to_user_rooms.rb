class AddUserRefToUserRooms < ActiveRecord::Migration[5.0]
  def change
    add_reference :user_rooms, :user, foreign_key: true
  end
end
